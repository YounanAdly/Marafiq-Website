import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { ButtonComponent } from '../../shared/components/button.component';
import { OtpModalComponent } from '../../shared/components/otp-modal.component';
import { SuccessAlertModalComponent } from '../../shared/components/success-alert-modal.component';
import { SeoService } from '../../shared/services/seo.service';
import formConfig from './form.json';

@Component({
    selector: 'app-create-account',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyModule,
        TranslateModule,
        RouterModule,
        ButtonComponent,
        OtpModalComponent,
        SuccessAlertModalComponent
    ],
    templateUrl: './create-account.component.html',
    styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
    private readonly seo = inject(SeoService);
    private readonly translate = inject(TranslateService);

    readonly bgImage = 'assets/images/bgImage.svg';
    readonly logoCard = 'assets/images/logoCard.svg';
    readonly logoNav = 'assets/images/logoNav.svg';
    readonly otpLength = 4;

    readonly createAccountForm = new FormGroup({});
    readonly createAccountModel = {
        fullName: '',
        emailAddress: '',
        mobileNumber: '',
        rememberMe: false,
    };

    isOtpModalOpen = false;
    isSuccessModalOpen = false;

    readonly createAccountFields: FormlyFieldConfig[] = formConfig as unknown as FormlyFieldConfig[];

    ngOnInit(): void {
        this.setSeo();
        this.translate.onLangChange.subscribe(() => this.setSeo());
    }

    onSubmit(): void {
        if (!this.createAccountForm.valid) {
            this.createAccountForm.markAllAsTouched();
            return;
        }

        this.isOtpModalOpen = true;
    }

    navigateToLogin(): void {
        this.router.navigate(['../login'], { relativeTo: this.route });
    }

    closeOtpModal(): void {
        this.isOtpModalOpen = false;
    }

    onOtpVerified(): void {
        this.isOtpModalOpen = false;
        this.isSuccessModalOpen = true;
    }

    onSuccessDone(): void {
        this.isSuccessModalOpen = false;
        this.router.navigate(['../home'], { relativeTo: this.route });
    }

    closeSuccessModal(): void {
        this.isSuccessModalOpen = false;
    }

    get maskedMobileNumber(): string {
        const digits = (this.createAccountModel.mobileNumber || '').replace(/\D/g, '');
        if (!digits) {
            return '+968 xxxxxxxx';
        }

        const visiblePart = digits.slice(-4);
        const hiddenPart = 'x'.repeat(Math.max(digits.length - visiblePart.length, 0));
        return `+968 ${hiddenPart}${visiblePart}`;
    }

    private setSeo(): void {
        this.seo.update({
            title: this.translate.instant('createAccount.seo.title'),
            description: this.translate.instant('createAccount.seo.description'),
            keywords: this.translate.instant('createAccount.seo.keywords'),
            url: this.translate.instant(environment.AppConfig.apiBaseUrl + 'createAccount.seo.url'),
            author: this.translate.instant('createAccount.seo.author'),
            type: 'website',
        });
    }
}