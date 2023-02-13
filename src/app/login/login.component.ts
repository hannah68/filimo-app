import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username= "";
  password= "";
  errorMes= "";

  constructor(private auth: AuthService, private router: Router){}

  login(){
    if(this.username.trim().length === 0){
      this.errorMes = "Username is required!"
    }else if(this.username.trim().length === 0){
      this.errorMes = "Password is required!"
    }else{
      this.errorMes = "";
      let res = this.auth.login(this.username, this.password);

      if(res === 200){
        this.router.navigate(['home'])
      }
      if(res === 403){
        this.errorMes = "Invalid Credentials";
      }
    }
  }

}
