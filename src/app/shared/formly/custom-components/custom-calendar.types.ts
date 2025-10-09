import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'formly-field-custom-input',
    imports: [CommonModule, ReactiveFormsModule, FormlyModule, DatePickerModule],
    template: `
    <p-datepicker [formControl]="formControl"
      [showIcon]="true"
      [formlyAttributes]="field" />
  `,
})
export class CustomCalendarTypeComponent extends FieldType<FieldTypeConfig> {
}
