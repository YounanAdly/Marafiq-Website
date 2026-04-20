import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

type ButtonVariant = 'login-primary' | 'login-outline' | 'action-primary' | 'action-outline';

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
      background: #e8a712;
      color: #ffffff;
      border-radius: 16px;
    }

    .login-primary:hover {
      background: #cf9210;
    }

    .login-outline {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      color: #e8a712;
      border-radius: 16px;
    }

    .login-outline:hover {
      background: #fafafa;
    }

    .action-primary,
    .action-outline {
      width: 154px;
      height: 45px;
      border-radius: 20px;
      box-shadow: 0px 0px 15.2px 6px rgba(232, 167, 18, 0.14);
      font-family: 'Poppins', 'AvantGarde Bk BT', sans-serif;
      font-weight: 500;
      line-height: 30px;
      padding: 0 12px;
    }

    .action-primary {
      background: #e8a712;
      color: #ffffff;
    }

    .action-outline {
      background: #ffffff;
      border: 1px solid #e8a712;
      color: #e8a712;
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
