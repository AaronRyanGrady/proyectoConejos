import {ModuleWithProviders} from '@angular/core';
import{Routes,RouterModule} from '@angular/router';


import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
const appRoutes: Routes = [
   // {path: '', component: AppComponent},
   {path: '', component: HomeComponent},
   {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegisterComponent},
    {path: 'mis-datos', component: UserEditComponent}
    
]
;
export const appRoutingsProvider : any[]=[];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);

