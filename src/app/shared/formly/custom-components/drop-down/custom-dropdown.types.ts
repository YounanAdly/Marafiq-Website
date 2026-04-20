import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'formly-field-custom-input',
    imports: [CommonModule, ReactiveFormsModule, FormlyModule, SelectModule],
    template: `
        <p-select
            [options]="items"
            [formControl]="formControl"
            [formlyAttributes]="field"
            appendTo="body"
            [optionLabel]="optionLabel"
            [optionValue]="optionValue"
            [showClear]="showClear"
            [placeholder]="placeholder"
            [disabled]="isDisabled"
            [styleClass]="dropdownClass"
        />
  `,
        styles: [`
            :host {
                display: block;
                width: 100%;
            }

            :host ::ng-deep .custom-dropdown {
                width: 100%;
                min-height: 56px;
                border: 1px solid #e4e2e6;
                border-radius: 8px;
                background: #ffffff;
            }

            :host ::ng-deep .custom-dropdown .p-select-label,
            :host ::ng-deep .custom-dropdown .p-select-dropdown {
                color: #5e5e62;
                font-family: 'AvantGarde Bk BT', 'Century Gothic', 'Trebuchet MS', sans-serif;
                font-size: 14px;
                line-height: 21px;
            }

            :host ::ng-deep .custom-dropdown .p-select-label {
                padding: 16px;
            }

            :host ::ng-deep .custom-dropdown.p-focus {
                border-color: #008c98;
                box-shadow: 0 0 0 3px rgba(0, 140, 152, 0.12);
            }

            :host ::ng-deep .custom-dropdown.dimmed {
                background: #f1f1f1;
                border-color: #d9d9d9;
            }

            :host ::ng-deep .custom-dropdown.dimmed .p-select-label,
            :host ::ng-deep .custom-dropdown.dimmed .p-select-dropdown {
                color: #859293;
            }
        `],
})
export class CustomDropDownTypeComponent extends FieldType<FieldTypeConfig> {

    get items() {
        return this.props?.options as any[];
    }

        get optionLabel(): string {
                return (this.props?.['optionLabel'] as string) || 'label';
        }

        get optionValue(): string {
                return (this.props?.['optionValue'] as string) || 'value';
        }

        get placeholder(): string {
                return (this.props?.['placeholder'] as string) || '';
        }

        get showClear(): boolean {
                return !!this.props?.['showClear'];
        }

        get isDisabled(): boolean {
                return !!this.props?.['disabled'];
        }

        get dropdownClass(): string {
                return this.props?.['dimmed'] ? 'custom-dropdown dimmed' : 'custom-dropdown';
        }
}
