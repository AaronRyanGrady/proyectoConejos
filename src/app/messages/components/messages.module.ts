import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//rutas
import { MessagesRoutingModule } from '../messages-routing.component';

import { MainComponent } from './main/main.component';
import { AddComponent } from './add/add.component';
import { ReceivedComponent } from './received/received.component';
import { SendedComponent } from './sended/sended.component';

@NgModule({
    declarations: [
        MainComponent,
        AddComponent,
        ReceivedComponent,
        SendedComponent
    ],
imports: [
    CommonModule,
    FormsModule,
    MessagesRoutingModule
],
exports: [
    MainComponent,
    AddComponent,
    ReceivedComponent,
    SendedComponent  

],
providers: [

]



})
export class MessagesModule {

    
}