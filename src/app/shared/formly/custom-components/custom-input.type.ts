import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'formly-field-custom-input',
  imports: [CommonModule, ReactiveFormsModule, FormlyModule, InputMaskModule],
  template: `
    <input type="text" pInputText [formControl]="formControl"
      [formlyAttributes]="field"
      class="custom-input"
      [placeholder]="to.placeholder"
      type="text"/>
  `,
})
export class CustomInputTypeComponent extends FieldType<FieldTypeConfig> {
}
