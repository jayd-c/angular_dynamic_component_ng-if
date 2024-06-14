import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'Home', component: HomeComponent},
    {path: 'Users', component: UsersComponent}
];
