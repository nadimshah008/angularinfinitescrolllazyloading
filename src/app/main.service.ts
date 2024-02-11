import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  baseURL=environment.baseURL;

  constructor(private http:HttpClient) {

  }
  getProducts(data:any){
    return this.http.get(`${this.baseURL}products?offset=${data.offset}&limit=${data.limit}`);
  }
}
