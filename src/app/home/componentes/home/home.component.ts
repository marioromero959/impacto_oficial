import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/admin/interface/product';
import { ProductsService } from 'src/app/products/services/products.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products = []

  cards = [
    {img:"../../../assets/img-velka/frase9.jpg"},
    {img:"../../../assets/img-velka/post40.jpg"},
    {img:"../../../assets/img-velka/frase2.jpg"}
  ]

  imagenesCarousel = [
    {img:"../../../../assets//productos_impacto/impacto_parlantes6.jpg"},
    {img:"../../../../assets//productos_impacto/impacto_parlantes1.jpg"},
    {img:"../../../../assets//productos_impacto/impacto_parlantes4.jpg"},
    {img:"../../../../assets//productos_impacto/impacto_parlantes5.jpg"},
    {img:"../../../../assets//productos_impacto/impacto_parlantes3.jpg"},
  ]
  constructor(private productSvc:ProductsService) {}

  ngOnInit(): void {
    this.productSvc.getAllProductsapi()
    .subscribe(res=>{
      this.products = res.map(el=>{
        let obj = el;
        obj.img = el.img[0]
        return obj
      });
    })
  }
  
}
