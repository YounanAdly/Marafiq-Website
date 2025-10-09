import { Routes } from '@angular/router';
import { HomePageComponent } from './public/home-page/home-page.component';

export const routes: Routes = [
    {
        path: ':lang',
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomePageComponent },
        ],
    },
];
