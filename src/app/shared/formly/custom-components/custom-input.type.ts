import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'formly-field-custom-input',
  imports: [CommonModule, ReactiveFormsModule, FormlyModule, InputTextModule],
  template: `
    <label
      [ngClass]="[containerClass, isDimmed ? 'is-dimmed' : '']"
      [attr.aria-label]="props['label'] || props['placeholder'] || 'input'"
    >
      <span class="custom-input-left-content">
        @if (iconSrc) {
          <img [class]="iconClass" [src]="iconSrc" alt="" />
        }
        <input
          pInputText
          [formControl]="formControl"
          [formlyAttributes]="field"
          [class]="inputClass"
          [required]="props.required ? true : false"
          [placeholder]="props.placeholder"
          [attr.type]="inputType"
          [attr.inputmode]="inputMode"
          [attr.autocomplete]="autoComplete"
          [readonly]="isDimmed"
          [disabled]="isDisabled"
        />
      </span>
    </label>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .custom-input-wrapper {
      display: block;
      width: 100%;
    }

    .custom-input-left-content {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      width: 100%;
      flex: 1 0 0;
    }

    .custom-input {
      border: none;
      outline: none;
      background: transparent;
      width: 100%;
      min-width: 0;
    }

    .form-input-container {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      min-height: 56px;
      padding: 8px 16px;
      box-sizing: border-box;
      background: #ffffff;
      border: 1px solid #e4e2e6;
      border-radius: 8px;
      cursor: text;
      justify-content: flex-end;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .form-input-container:focus-within {
      border-color: #008c98;
      box-shadow: 0 0 0 3px rgba(0, 140, 152, 0.12);
    }

    .form-field-input {
      border: none;
      outline: none;
      background: transparent;
      flex: 1;
      min-width: 0;
      font-family: 'AvantGarde Bk BT', 'Century Gothic', 'Trebuchet MS', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 21px;
      color: #5e5e62;
      text-align: left;
      box-shadow: none;
    }

    .form-field-input::placeholder {
      color: #5e5e62;
    }

    .form-input-container.is-dimmed {
      background: #f1f1f1;
      border-color: #d9d9d9;
      cursor: default;
    }

    .form-input-container.is-dimmed .form-field-input,
    .form-input-container.is-dimmed .form-field-input::placeholder {
      color: #859293;
    }

    .input-label {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      height: 45px;
      padding: 6px 20px;
      box-sizing: border-box;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 16px;
      cursor: text;
      justify-content: flex-end;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .input-label:focus-within {
      border-color: #008c98;
      box-shadow: 0 0 0 3px rgba(0, 140, 152, 0.12);
    }

    .field-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    .field-input {
      border: none;
      outline: none;
      background: transparent;
      flex: 1;
      min-width: 0;
      font-family: 'AvantGarde Bk BT', 'Century Gothic', 'Trebuchet MS', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 21px;
      color: #2b2b2b;
      text-align: left;
      box-shadow: none;
    }

    .field-input::placeholder {
      color: rgba(133, 146, 147, 0.57);
    }
  `],
})
export class CustomInputTypeComponent extends FieldType<FieldTypeConfig> {
  get variant(): string {
    return (this.props?.['variant'] as string) || 'form';
  }

  get inputType(): string {
    return (this.props?.['type'] as string) || 'text';
  }

  get inputMode(): string | null {
    return (this.props?.['inputmode'] as string) || null;
  }

  get autoComplete(): string | null {
    return (this.props?.['autocomplete'] as string) || null;
  }

  get iconSrc(): string | null {
    return (this.props?.['prefixIconSrc'] as string) || null;
  }

  get isDimmed(): boolean {
    return !!this.props?.['dimmed'];
  }

  get isDisabled(): boolean {
    return !!this.props?.['disabled'];
  }

  get containerClass(): string {
    if (this.props?.['containerClass']) {
      return this.props['containerClass'] as string;
    }
    return this.variant === 'login' ? 'input-label' : 'form-input-container';
  }

  get inputClass(): string {
    if (this.props?.['inputClass']) {
      return this.props['inputClass'] as string;
    }
    return this.variant === 'login' ? 'field-input' : 'form-field-input';
  }

  get iconClass(): string {
    return (this.props?.['iconClass'] as string) || 'custom-input-icon';
  }
}
