import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class PwaTestingService {

  constructor(private http:HttpClient) { }

  getData():Observable<any>{
    return this.http.get(baseUrl + 'pwaTesting');
  }

  sendData(data):Observable<any>{
    return this.http.post(baseUrl + 'pwaTesting', data)
  }
}
