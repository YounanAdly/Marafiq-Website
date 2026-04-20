import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { ButtonComponent } from '../../shared/components/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormlyModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly bgImage = 'https://www.figma.com/api/mcp/asset/46108dd2-eed9-409b-a7cd-66bd736adcbb';
  readonly logoCard = 'https://www.figma.com/api/mcp/asset/1c285fe9-9811-424b-8361-6e1ed7b6dfde';
  readonly logoNav = 'https://www.figma.com/api/mcp/asset/20967614-fd03-42e3-8bf7-351c6042758d';
  readonly phoneIcon = 'https://www.figma.com/api/mcp/asset/a86a3276-ed46-4624-b770-d2255519eec2';

  readonly loginForm = new FormGroup({});
  readonly loginModel = {
    mobileNumber: '',
  };

  readonly loginFields: FormlyFieldConfig[] = [
    {
      key: 'mobileNumber',
      type: 'custom-input',
      wrappers: [],
      props: {
        required: true,
        placeholder: 'Mobile Number',
        variant: 'login',
        type: 'tel',
        inputmode: 'tel',
        autocomplete: 'tel',
        prefixIconSrc: this.phoneIcon,
        containerClass: 'input-label',
        inputClass: 'field-input',
        iconClass: 'field-icon',
      },
    },
  ];

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login form payload:', this.loginModel);
    }
  }
}
