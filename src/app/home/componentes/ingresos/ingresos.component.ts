import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products/services/products.service';
import { filter } from 'rxjs/operators';
import { Producto } from 'src/app/shared/producto-interface';
import { Productos } from 'src/app/admin/interface/product';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss']
})
export class IngresosComponent implements OnInit {

  productos:Producto[] = []

  constructor(private productsSvc:ProductsService,private router:Router) { }

  ngOnInit(): void {
    this.productsSvc.getAllProductsapi()
    .pipe(map((res:any)=> res.productos))
    .subscribe((res:Producto[])=>{
      if(res.length > 1){
        this.productos.push(res[res.length-1])
        this.productos.push(res[res.length-2])
      }
    })
  }
  showDetails(index:number){
    this.router.navigate([`products/${this.productos[index]._id}`])
 }
}
