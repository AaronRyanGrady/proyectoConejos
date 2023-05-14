import { Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import { User } from 'src/app/models/user';
import {UserService} from '../../services/user.service';



@Component({

    selector: 'register',
    templateUrl: 'register.component.html',
    providers: [UserService]

})
export class RegisterComponent implements OnInit {
    public title:string;
    public user:User;
    public status: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title='Registrate';
        this.status='';
        this.user= new User("",
        "",
        "",
        "",
        "",
        "",
        "ROLE_USER",
        "" 
     )
    }

    ngOnInit() {
        console.log('componente de registro cargado...')
        
    }
    /*onSubmit() {
        
        this._userService.register(this.user).subscribe(
            response => {

                if (response.user&&response.user._id){
                    console.log(response.user)


                }

            },
            error => {
                
                console.log(<any>error);
            })

    
    
        }*/

        onSubmit() {
            this._userService.register(this.user).subscribe({
                next: response => {
                    if (response.user && response.user._id){
                        console.log(response.user);

                        this.status = 'success';
                    }
                    else{
                        this.status = 'error';
                    }
                },
                error: error => {
                    console.log(error);
      this.status = 'error'; // asignar un valor a status en caso de error
                }
            });
        }
    }