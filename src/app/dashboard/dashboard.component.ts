import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { authentication } from '../services/authentication';
import { ProductService } from "../services/product.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends authentication implements OnInit{

  constructor(private authService: AuthService, private router: Router, private productService: ProductService) { 
    super();
  }
  user;
  products;
  baseUrl= 'assets/images/profile/';
  auth = new authentication();
  showDetails = false;
  loginForFirstTime = false;
  ngOnInit() { 
    this.auth.authenctication(this.authService, this.router);
    setTimeout(()=>{
      this.setup()
    } , 1000)
  }
  setup() {
    this.user = this.auth.user;
    if(!this.user.lastLogin)
      this.loginForFirstTime = true;
    this.showDetails = true;
  }
 
}
