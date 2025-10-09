import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'formly-field-custom-input',
    imports: [CommonModule, ReactiveFormsModule, FormlyModule],
    template: `
    <input
      [formControl]="formControl"
      [formlyAttributes]="field"
      class="custom-input"
      [placeholder]="to.placeholder"
      type="text"
    />
  `,
})
export class CustomInputTypeComponent extends FieldType<FieldTypeConfig> {
}
