import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button.component';
import { OtpModalComponent } from '../../shared/components/otp-modal.component';
import formConfig from './form.json';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormlyModule, TranslateModule, ButtonComponent, OtpModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly bgImage = 'https://www.figma.com/api/mcp/asset/46108dd2-eed9-409b-a7cd-66bd736adcbb';
  readonly logoCard = 'https://www.figma.com/api/mcp/asset/1c285fe9-9811-424b-8361-6e1ed7b6dfde';
  readonly logoNav = 'https://www.figma.com/api/mcp/asset/20967614-fd03-42e3-8bf7-351c6042758d';
  readonly otpLength = 4;

  readonly loginForm = new FormGroup({});
  readonly loginModel = {
    mobileNumber: '',
  };

  isOtpModalOpen = false;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  readonly loginFields: FormlyFieldConfig[] = formConfig as unknown as FormlyFieldConfig[];

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.openOtpModal();
    }
  }

  onCreateAccount(event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();
    const lang = this.route.snapshot.paramMap.get('lang') || 'en';
    this.router.navigateByUrl(`/${lang}/create-account`);
  }

  get maskedMobileNumber(): string {
    const digits = (this.loginModel.mobileNumber || '').replace(/\D/g, '');
    if (!digits) {
      return '+968 xxxxxxxx';
    }

    const visiblePart = digits.slice(-4);
    const hiddenPart = 'x'.repeat(Math.max(digits.length - visiblePart.length, 0));
    return `+968 ${hiddenPart}${visiblePart}`;
  }

  openOtpModal(): void {
    this.isOtpModalOpen = true;
  }

  closeOtpModal(): void {
    this.isOtpModalOpen = false;
  }

  verifyOtp(): void {
    this.isOtpModalOpen = false;
    this.router.navigate(['../home'], { relativeTo: this.route });
  }
}
