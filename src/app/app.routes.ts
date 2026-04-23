import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { ContactUsComponent } from './public/contact-us/contact-us.component';
import { LoginComponent } from './public/login/login.component';
import { CreateAccountComponent } from './public/create-account/create-account.component';

export const routes: Routes = [
    {
        path: ':lang',
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'contact-us', component: ContactUsComponent },
            { path: 'login', component: LoginComponent },
            { path: 'create-account', component: CreateAccountComponent },
        ],
    },
];
