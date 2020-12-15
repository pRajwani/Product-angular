import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { baseUrl } from "../services/baseUrl";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  user;
  accessToken;
  userLogin(userData):Observable<any> {
    console.log("Service")
    return this.http.post( baseUrl + "users/login", userData);
  }
  
  setAccessToken(token) {
    this.accessToken = token;
  }

  getAccessToken() {
    return this.accessToken;
  }

  isLoggedIn(){
    if(this.user) return true;
    else false;
  }

  logout():Observable<any> {
    return this.http.get(baseUrl + 'users/logout');
  }
  sendLastLogin(date, user):Observable<any> {
    return this.http.post(baseUrl + "users/sendLastLogin", {lastLogin: date, user: user});
  }

  setUser(user){
    this.user= user;
  }

  setUserDetails(Token?): Observable<any> {
    this.accessToken = Token;
    return this.http.get(baseUrl + 'users/getUserDetails');
  }

  getAToken(): Observable<any> {
    return this.http.get(baseUrl + 'users/checkCode');
  }

  userSignUp(userData):Observable<any> {
    return this.http.post(baseUrl + "users/signUp", userData);
  }
  checkUserName(username):Observable<any> {
    console.log("in checkUsername service", username)
    return this.http.post(baseUrl + "users/checkUsername", {username:username});
  }
  checkMobileNumber(number):Observable<any> {
    return this.http.post(baseUrl + "users/checkMobileNumber", {mobile_Number:number});
  }
}
