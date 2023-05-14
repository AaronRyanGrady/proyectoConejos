import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs';
import {User} from '../models/user';
import {GLOBAL} from './global';


@Injectable()
export class UserService {
  [x: string]: any;
    public url:string;
    public identity: any;
  public token: any;
  public stats: any;

    constructor(public _http:HttpClient)
{
    this.url=GLOBAL.url;
}

register(user :User):Observable<any>{
    
   // console.log(user_to_register);
    //console.log(this.url);

    let params= JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'register',params,{headers:headers});
}


singup(user :User,gettoken: boolean= false):Observable<any>{
    if(gettoken!=null){
        user.gettoken = gettoken;

    }
    let params= JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'login',params,{headers:headers});


}
login(user: User, gettoken = false): Observable<any> {
    if (gettoken) {
      user.gettoken = true;
    }
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login', params, {headers: headers});
  }
  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity') ?? 'null');
    if (identity!= "undefined"){
        this.identity=identity;
    }else{
        this.identity=null;
    }

    return this.identity;
}

getToken(){
    let token=localStorage.getItem('token');
    if (token!= "undefined"){
        this.token=token;
    }else{
        this.token=null;
    }

    return this.token;
}

getStats() {
    let stats = localStorage.getItem('stats');
    if (stats && typeof stats === 'string') {
      try {
        this.stats = JSON.parse(stats);
      } catch (error) {
        console.error('Error parsing stats:', error);
      }
    } else {
      this.stats = null;
    }
    return this.stats;
  }
getCounters(userId=null):Observable<any> {
    let headers=new HttpHeaders().set('Content-Type', 'application/json')
                                .set('Authorization', this.getToken());

                                if (userId != null) {
                                  return this._http.get(this.url+'counters/'+userId,{headers:headers})
                                }
                                else {
                                  return this._http.get(this.url+'counters/',{headers:headers})

                                }

    
  }
  updateUser(user:User):Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', this.getToken());


    return this._http.put(this.url + 'update-user/'+user._id,params, {headers: headers});
    

}


}

