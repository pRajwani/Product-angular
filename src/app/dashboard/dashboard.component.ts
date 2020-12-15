import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProductService } from "../services/product.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private productService: ProductService) { }
  user;
  products;
  baseUrl= 'assets/images/profile/'
  ngOnInit(): void {
    this.authentication();
  }

  setup() {
    if(!this.user.lastLogin)
      this.user.lastLogin = "First Time Logged in";
  }

  

  authentication() {
    var token = this.authService.getAccessToken()
    if(!token) {
      this.authService.getAToken().subscribe((token)=>{
      console.log("token status", token)
      if(token.status == false){
        console.log("in if cond")
        this.router.navigate(['login']);
        return;
      }
      this.authService.setUserDetails(token.result).subscribe((userData)=>{
        console.log("in retriving user")
        this.user = userData;
        this.authService.setUser(this.user);
        console.log(this.user);
        this.setup();
        })
      })
    }
    else {
      this.authService.setUserDetails(token).subscribe((userData)=>{
        this.user = userData;
        this.authService.setUser(this.user);
        this.setup();
      })
    }
  }


  
}
