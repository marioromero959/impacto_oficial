import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products/services/products.service';
import { filter } from 'rxjs/operators';
import { Producto } from 'src/app/shared/producto-interface';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss']
})
export class IngresosComponent implements OnInit {

  productos:Producto[] = []

  constructor(private productsSvc:ProductsService) { }

  ngOnInit(): void {
    this.productsSvc.getAllProductsapi().subscribe((res:Producto[])=>{
      if(res.length > 1){
        this.productos.push(res[res.length-1])
        this.productos.push(res[res.length-2])
      }
    })
  }
//ver length para poner los ultimos
}
