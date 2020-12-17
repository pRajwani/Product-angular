import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { authentication } from "../services/authentication";

@Component({
  selector: 'app-how-to-use',
  templateUrl: './how-to-use.component.html',
  styleUrls: ['./how-to-use.component.scss']
})
export class HowToUseComponent extends authentication implements OnInit {

  constructor(public authService: AuthService, router:Router) { 
    super(authService, router);
  }
  router = this.router;
  ngOnInit(): void {
    var auth = new authentication(this.authService, this.router);
    auth.authenctication();
  }
}
