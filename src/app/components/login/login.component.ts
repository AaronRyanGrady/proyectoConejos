/*import { Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';




@Component({

    selector: 'login',
    templateUrl: 'login.component.html',
    providers: [UserService]

})
export class LoginComponent implements OnInit {
    public title:string;
    public user:User;
    public status: string;
    public identity: any;
    public token: any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService

    ){
        this.title='Identificate';
       
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
        console.log('componente de login cargado...')
        
    }*/

   /* onSubmit() {
        this._userService.singup(this.user).subscribe({
            next: response => {
               
                    console.log(response.user);
                    this.status='success';

                  
         
            },
            error: error => {
                var errorMessage=<any>error;

                console.log(errorMessage);

                if(errorMessage != null) {
                    this.status = 'error';
                }

            }
        });
    }*/
   /* onSubmit() {
        this._userService.singup(this.user,true).subscribe({
            next: response => {
               
                    this.identity = response.user;
                    if(!this.identity || this.identity._id){
                        this.status = 'error';
                    }
                    else{
                        this.status = 'success';
                        //persistir datos del usuario

                        //conseguir el token
                        
                    }

                  
         
            },
            error: error => {
                var errorMessage=<any>error;

                console.log(errorMessage);

                if(errorMessage != null) {
                    this.status = 'error';
                }

            }
        });
    }*/

    /*gettoken() {
        if (this.user.gettoken) {
            // Si la propiedad gettoken es true, se retorna true
            return true;
        } else {
            // Si la propiedad gettoken es false o no está definida, se retorna false
            return false;
        }
    }*/
    /*getToken() {
        this._userService.singup(this.user,true).subscribe({
            next: response => {
               
                    this.token = response.token;
                    if(this.token.length <= 0){
                        this.status = 'error';
                    }
                    else{
                        this.status = 'success';
                        //persistir datos del usuario

                        //conseguir los contadores o estadisticas
                    }

                  
         
            },
            error: error => {
                var errorMessage=<any>error;

                console.log(errorMessage);

                if(errorMessage != null) {
                    this.status = 'error';
                }

            }
        });
    }*/


    
//}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public title: string;
  public user: User;
  public status: string;
  public identity: any;
  public token: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Identificate';
    this.status = '';
    this.user = new User(
      '',
      '',
      '',
      '',
      '',
      '',
      'ROLE_USER',
      ''
    );
  }

  ngOnInit() {
    console.log('componente de login cargado...');
  }

  onSubmit() {
    this._userService.login(this.user).subscribe({
      next: response => {
        this.identity = response.user;
        if (!this.identity || !this.identity._id) {
          this.status = 'error';
        } else {
          this.status = 'success';
          // persistir datos del usuario
          localStorage.setItem('identity', JSON.stringify(this.identity));
          console.log(response.user);
          this.getToken();
        }
      },
      error: error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    });
  }

  getToken() {
    this._userService.login(this.user, true).subscribe({
      next: response => {
        this.token = response.token;
        if (!this.token) {
          console.log('No se ha generado el token');
        } else {
          console.log('Token: ' + this.token);
          // persistir token en local storage
          localStorage.setItem('token', this.token);
          // obtener los contadores o estadísticas
          this.getCounters();
          this._router.navigate(['/']);
        }
      },
      error: error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    });
  }
//se debe mejorar esta función getCounters
  getCounters() {
    this._userService.getCounters().subscribe(
      response =>{
        console.log(response);
        /*if(response.following.length<=0){

        }*/

      },
      error =>{
          console.log(<any>error);
      }
      )
    console.log('Obteniendo los contadores o estadísticas');
  }
}