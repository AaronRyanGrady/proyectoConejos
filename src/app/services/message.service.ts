import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs';
import {User} from '../models/user';
import {GLOBAL} from './global';


@Injectable()
export class MessageService {
 
    public url:string;
    public identity: any;
    public token: any;
    public stats: any;

    constructor(private _http:HttpClient)
{
    this.url=GLOBAL.url;
}
addMessage(token:any,message:any):Observable<any>{
    let params=JSON.stringify(message);
    let headers=new HttpHeaders().set('Content-Type', 'application/json')
                                .set('Authorization',token);

    return this._http.post(this.url+'messages',params,{headers:headers});
}

getMyMessages(token:any,page =1):Observable<any>{
    let headers=new HttpHeaders().set('Content-Type', 'application/json')
                                .set('Authorization',token);
return this._http.get(this.url+'messagesreceive/'+ page,{headers:headers});//definir bien la ruta en chatgpt dando ejemplo de las rutas de messages

}

getEmmitMessages(token:any,page =1):Observable<any>{
    let headers=new HttpHeaders().set('Content-Type', 'application/json')
                                .set('Authorization',token);
return this._http.get(this.url+'message/'+ page,{headers:headers});//definir bien la ruta en chatgpt dando ejemplo de las rutas de messages

}
}