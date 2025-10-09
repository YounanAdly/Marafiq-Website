import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { CustomInputTypeComponent } from './custom-components/custom-input.type';
@NgModule({
    imports: [
        ReactiveFormsModule,
        FormlyBootstrapModule,
        FormlyModule.forRoot({
            extras: { lazyRender: true, resetFieldOnHide: true },
            types: [
                {
                    name: 'custom-input',
                    component: CustomInputTypeComponent,
                    wrappers: ['form-field'],
                }
            ]
        }),
    ],
    exports: [FormlyModule]
})
export class FormlyConfigModule { }
