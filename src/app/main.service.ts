import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  baseURL=environment.baseURL;
  fakeURL= environment.fakeAPIURL;

  constructor(private http:HttpClient) {

  }
  getProducts(data:any){
    return this.http.get(`${this.baseURL}products?offset=${data.offset}&limit=${data.limit}`);
  }
  getProductsFakeAPI(data:any){
    return this.http.get(`${this.fakeURL}?limit=${data.limit}`)
  }
}
