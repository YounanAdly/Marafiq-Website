import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

type ButtonVariant = 'login-primary' | 'login-outline' | 'action-primary' | 'action-outline' | 'otp-verify' | 'service-apply';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [attr.type]="type"
      [disabled]="disabled"
      [ngClass]="buttonClass"
      (click)="clicked.emit($event)">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .btn {
      border: none;
      cursor: pointer;
      transition: background 0.2s ease, color 0.2s ease, opacity 0.15s ease;
      font-family: 'AvantGarde Bk BT', 'Century Gothic', 'Trebuchet MS', sans-serif;
      font-weight: 700;
      font-size: 16px;
      line-height: 22px;
      text-align: center;
      padding: 12px;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .full-width {
      width: 100%;
    }

    .login-primary {
      background: var(--color-orange);
      color: var(--color-modal-bg);
      border-radius: 16px;
    }

    .login-primary:hover {
      background: var(--color-orange-hover);
    }

    .login-outline {
      background: var(--color-modal-bg);
      border: 1px solid var(--color-input-border);
      color: var(--color-orange);
      border-radius: 16px;
    }

    .login-outline:hover {
      background: var(--color-surface-muted);
    }

    .action-primary,
    .action-outline {
      width: 154px;
      height: 45px;
      border-radius: 20px;
      box-shadow: 0 0 15.2px 6px var(--color-orange-soft-shadow);
      font-family: 'Poppins', 'AvantGarde Bk BT', sans-serif;
      font-weight: 500;
      line-height: 30px;
      padding: 0 12px;
    }

    .action-primary {
      background: var(--color-orange);
      color: var(--color-modal-bg);
    }

    .action-outline {
      background: var(--color-modal-bg);
      border: 1px solid var(--color-orange);
      color: var(--color-orange);
    }

    .otp-verify {
      min-height: 40px;
      border-radius: 16px;
      background: var(--color-orange);
      color: var(--color-modal-bg);
      padding: 9px 16px;
      line-height: 22px;
    }

    .otp-verify:hover {
      background: var(--color-orange-hover);
    }

    .service-apply {
      width: 100%;
      min-height: 35px;
      border-radius: 20px;
      background: var(--color-orange);
      color: var(--color-modal-bg);
      font-family: 'Poppins', 'AvantGarde Bk BT', sans-serif;
      font-weight: 500;
      font-size: 16px;
      line-height: 30px;
      padding: 0 12px;
    }

    .service-apply:hover {
      background: var(--color-orange-hover);
    }
  `],
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'login-primary';
  @Input() fullWidth = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;

  @Output() clicked = new EventEmitter<Event>();

  @HostBinding('style.display')
  get hostDisplay(): string {
    return this.fullWidth ? 'block' : 'inline-flex';
  }

  @HostBinding('style.width')
  get hostWidth(): string {
    return this.fullWidth ? '100%' : 'auto';
  }

  get buttonClass(): string[] {
    return ['btn', this.variant, this.fullWidth ? 'full-width' : ''];
  }
}
