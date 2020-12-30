import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  profileImageUpload(image):Observable<any> {
    return this.http.post( baseUrl + "upload/profile", image);
  }

  uploadProductImage(image):Observable<any> {
    return this.http.post( baseUrl + 'upload/product',image);
   }

}
