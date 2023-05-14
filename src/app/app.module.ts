import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing,appRoutingsProvider } from './app.routing';
import { FormsModule } from '@angular/forms';

//modulo custom

import {MessagesModule} from './messages/components/messages.module';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent
   
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    MessagesModule
  ],
  providers: [
    appRoutingsProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
