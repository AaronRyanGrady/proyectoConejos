import { Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import { User } from 'src/app/models/user';
import {UserService} from '../../services/user.service';
import { UploadService } from 'src/app/services/upload.service';

import { GLOBAL } from 'src/app/services/global';
@Component({
    selector: 'user-edit',
    templateUrl: 'user-edit.component.html',
    providers: [UserService,UploadService],
  })
  export class UserEditComponent implements OnInit {
    public title:string;
    public status: string;
  public user: User;
  
  
  public identity: any;
  public token: any;
  public url: string;
  

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _uploadService: UploadService
  ){
    this.title = 'actualizar mis datos';
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.token = this._userService.getToken();
    this.status = '';
    this.url=GLOBAL.url;
    

  }
  ngOnInit(): void {
    console.log(this.user);
      
    console.log('user-edit componen se ha cargado');
  }
  /*onSubmit() {
    console.log(this.user);
    this._userService.updateUser(this.user).subscribe(
      response => {
        if (response.user) {
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));
          this.identity = this.user;
          // SUBIDA DE IMAGEND E USUARIO
        } else {
          this.status = 'error';
        }
      },
      error => {
        var errorMessage = <any> error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }*/

  onSubmit() {
    console.log(this.user);
    this._userService.updateUser(this.user).subscribe(
      response => {
        if (response.user) {
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));
          this.identity = this.user;
          // SUBIDA DE IMAGEND E USUARIO
          this._uploadService.makeFileRequest(this.url+'userimage/'+this.user._id,[],this.filesToUpload,this.token,'image')
              .then((result:any) => {
                console.log(result);
                this.user.image = result.image;
                localStorage.setItem('identity', JSON.stringify(this.user));
              });
        } else {
          this.status = 'error';
        }
      },
      error => {
        var errorMessage = <any> error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  public filesToUpload: Array<File> = [];
  fileChangeEvent(fileInput:any){
    this.filesToUpload=<Array<File>> fileInput.target.files;
    console.log(this.filesToUpload);

  }

  }