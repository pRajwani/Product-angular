import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
    username;
    password;
  ngOnInit(): void {
  }


  localLogin() {
    var userData = {
      username: this.username,
      password: this.password
    }
    if(isNaN(userData.username) == false){
      userData.username = Number(userData.username);
    } 
    console.log(userData);
    this.authService.userLogin(userData).subscribe((resp)=>{
      if(resp.success==true){
        
        this.authService.setUserDetails(resp.accessToken).subscribe((user)=>{
          this.authService.setUser(user);
          this.authService.sendLastLogin(Date.now(), user).subscribe();
          this.router.navigate(['dashboard'])
        })

        
      }
      else {
        window.alert("Wrong Credentials");
      }
    })
  }
}
