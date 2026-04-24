import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-success-alert-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonComponent],
  templateUrl: './success-alert-modal.component.html',
  styleUrl: './success-alert-modal.component.scss',
})
export class SuccessAlertModalComponent {
  @Input() isOpen = false;
  @Input() iconSrc = 'assets/images/copy-success.svg';
  @Input() closeIconSrc = 'https://www.figma.com/api/mcp/asset/f7cf182e-bfb9-44dd-b2d6-2a3fceb685b7';
  @Input() titleKey = 'createAccount.success.title';
  @Input() descriptionKey = 'createAccount.success.description';
  @Input() doneLabelKey = 'createAccount.success.done';

  @Output() done = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  onDone(): void {
    this.done.emit();
  }

  onClose(): void {
    this.closed.emit();
  }
}
