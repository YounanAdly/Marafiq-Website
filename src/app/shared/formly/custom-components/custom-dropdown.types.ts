import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { SelectModule } from 'primeng/select';
;

@Component({
    selector: 'formly-field-custom-input',
    imports: [CommonModule, ReactiveFormsModule, FormlyModule, SelectModule],
    template: `
   <p-select [options]="cities" [formControl]="formControl"
   appendTo="body"
        optionLabel="name"
    optionValue="code"
    [showClear]="true"
      [formlyAttributes]="field" optionLabel="name" placeholder="Select a City" />

  `,
})
export class CustomDropDownTypeComponent extends FieldType<FieldTypeConfig> {
    cities = [{ name: 'New York', code: 'NY' },]
}
