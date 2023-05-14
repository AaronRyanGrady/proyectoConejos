import { Component,OnInit,DoCheck } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import { Message } from 'src/app/models/message';
import { MessageService } from '../../../services/message.service';
import { User } from 'src/app/models/user';
import { GLOBAL } from 'src/app/services/global';
import {UserService} from '../../../services/user.service';



@Component({
    selector:'add',
    templateUrl:'./add.component.html',
    providers: [MessageService]
})

export class AddComponent implements OnInit {
    public title:string;
    public message:Message;
    public identity:any;
    public token;
    public url:string;
    public status:string;
    public user: User;



    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _messageService: MessageService,
        private _userService: UserService

    ){
        
        this.title = 'Enviar mensaje';
        this.user = this._userService.getIdentity();
       
        this.identity =this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url=GLOBAL.url;
        this.status = '';
        this.message = new Message('','', '', '',this.identity._id,'');


    }
    ngOnInit() {
        console.log('add.component cargado');
        
    }
    onSubmit() {
        this._messageService.addMessage(this.token,this.message).subscribe(response =>{
            if(response.message){
                this.status='success';
                //form.reset();

            }
        },
        error =>{
            this.status='error';

        }
        );
        
    }

}
