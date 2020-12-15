import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from "../services/baseUrl";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productImage:File;
  constructor(private http:HttpClient) { }

  getAllProducts():Observable<any> {
    return this.http.get(baseUrl+ 'products');
  }

  addNewProduct(product):Observable<any> {
    return this.http.post(baseUrl+ 'products', product);
  }

  updateProduct(product):Observable<any> {
    return this.http.put(baseUrl+ 'products', product);
  }

  deleteProduct(product):Observable<any> {
    return this.http.delete(baseUrl+ 'products/'+product._id);
  }

  getProductImage(){
    return this.productImage
  }

  setProductImage(image){
    this.productImage = image;
  }

  uploadProductImage(image):Observable<any> {
   return this.http.post( baseUrl + 'upload/product',image);
  }
}
