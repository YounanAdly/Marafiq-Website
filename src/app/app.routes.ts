import { Routes } from '@angular/router';
import { HomePageComponent } from './public/home-page/home-page.component';
import { ContactUsComponent } from './public/contact-us/contact-us.component';
import { LoginComponent } from './public/login/login.component';
import { CreateAccountComponent } from './public/create-account/create-account.component';

export const routes: Routes = [
    {
        path: ':lang',
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomePageComponent },
            { path: 'contact-us', component: ContactUsComponent },
            { path: 'login', component: LoginComponent },
            { path: 'create-account', component: CreateAccountComponent },
        ],
    },
];
