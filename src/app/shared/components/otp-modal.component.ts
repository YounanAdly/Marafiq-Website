import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'app-otp-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonComponent],
  templateUrl: './otp-modal.component.html',
  styleUrl: './otp-modal.component.scss',
})
export class OtpModalComponent implements AfterViewChecked {
  @Input() isOpen = false;
  @Input() otpLength = 4;
  @Input() maskedMobileNumber = '+968 xxxxxxxx';
  @Input() otpIllustrationSrc = 'assets/images/otp-illustration.svg';
  @Input() closeIconSrc = 'https://www.figma.com/api/mcp/asset/f7cf182e-bfb9-44dd-b2d6-2a3fceb685b7';

  @Output() closed = new EventEmitter<void>();
  @Output() verified = new EventEmitter<string>();

  @ViewChildren('otpInput')
  private otpInputRefs?: QueryList<ElementRef<HTMLInputElement>>;

  otpDigits: string[] = Array(this.otpLength).fill('');

  private didFocusOnOpen = false;

  ngAfterViewChecked(): void {
    if (this.isOpen && !this.didFocusOnOpen) {
      this.didFocusOnOpen = true;
      this.focusOtpInput(0);
    }

    if (!this.isOpen && this.didFocusOnOpen) {
      this.didFocusOnOpen = false;
      this.resetOtpDigits();
    }

    if (this.otpDigits.length !== this.otpLength) {
      this.resetOtpDigits();
    }
  }

  get isOtpComplete(): boolean {
    return this.otpDigits.every((digit) => /^\d$/.test(digit));
  }

  trackByOtpIndex(index: number): number {
    return index;
  }

  onClose(): void {
    this.closed.emit();
  }

  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const normalizedValue = input.value.replace(/\D/g, '').slice(-1);

    this.otpDigits[index] = normalizedValue;
    input.value = normalizedValue;

    if (normalizedValue && index < this.otpLength - 1) {
      setTimeout(() => this.focusOtpInput(index + 1), 0);
    }
  }

  onOtpKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
      this.focusOtpInput(index - 1);
      return;
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focusOtpInput(index - 1);
      return;
    }

    if (event.key === 'ArrowRight' && index < this.otpLength - 1) {
      event.preventDefault();
      this.focusOtpInput(index + 1);
    }
  }

  onOtpPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedDigits = event.clipboardData?.getData('text').replace(/\D/g, '').slice(0, this.otpLength) || '';

    for (let i = 0; i < this.otpLength; i += 1) {
      this.otpDigits[i] = pastedDigits[i] || '';
    }

    const nextIndex = Math.min(pastedDigits.length, this.otpLength - 1);
    this.focusOtpInput(nextIndex);
  }

  onVerify(): void {
    if (!this.isOtpComplete) {
      return;
    }

    this.verified.emit(this.otpDigits.join(''));
  }

  private resetOtpDigits(): void {
    this.otpDigits = Array(this.otpLength).fill('');
  }

  private focusOtpInput(index: number): void {
    setTimeout(() => {
      const inputElement = this.otpInputRefs?.get(index)?.nativeElement;
      if (!inputElement) {
        return;
      }

      inputElement.focus();
      inputElement.select();
    }, 0);
  }
}
