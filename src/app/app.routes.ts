import { Routes } from '@angular/router';
import { CountriesPage } from './features/countries/pages/countries-page/countries-page';



export const routes: Routes = [
    { path: '', redirectTo: 'countries', pathMatch: 'full'},
    { path: 'countries', component: CountriesPage },
];
