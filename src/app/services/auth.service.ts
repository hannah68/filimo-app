import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(username:string, password:string){
    if(username === "hannah" && password === '1234'){
      return 200;
    }else{
      return 403
    }
  }
}
