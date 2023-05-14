import { Component,OnInit,DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import {Router,ActivatedRoute,Params} from '@angular/router';
import { GLOBAL } from './services/global';
import { User } from './models/user';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit,DoCheck {
  public title:string;
  public identity: any;
  public url: string;
  public user:User;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.title = 'bunnielovers';
    this.url= GLOBAL.url;
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
  ngOnInit(){
    this.identity = this._userService.getIdentity();
    console.log(this.identity);
  }
  ngDoCheck(){
    this.identity = this._userService.getIdentity();
  }
  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);



  }
  
}
