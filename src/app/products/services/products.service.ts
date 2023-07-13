import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { filter,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getAllProductsapi(limite:number = 15,desde:number = 0,categoria?){
    
    const params = new HttpParams()
    .set('limite', limite)
    .set('desde', desde)
    .set('category', categoria);
    
    return this.http.get(`${environment.API}/api/productos/getAllProducts`,{params})
  }
  getProductapi(id){
    return this.http.get(`${environment.API}/api/productos/${id}`);
  }
}
