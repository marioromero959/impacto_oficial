import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { filter,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getAllProductsapi(){
    return this.http.get(`${environment.API}/api/productos`)
    .pipe(map((res:any)=> res.productos));
  }
  getProductapi(id){
    return this.http.get(`${environment.API}/api/productos/${id}`);
  }
}
