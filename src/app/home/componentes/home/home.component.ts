import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/admin/interface/product';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cards = [
    {img:"../../../assets/img-velka/frase9.jpg"},
    {img:"../../../assets/img-velka/post40.jpg"},
    {img:"../../../assets/img-velka/frase2.jpg"}
  ]
  imagenesCarousel = [
    "../../../../assets//productos_impacto/impacto_parlantes6.jpg",
    "../../../../assets//productos_impacto/impacto_parlantes1.jpg",
    "../../../../assets//productos_impacto/impacto_parlantes4.jpg",
    "../../../../assets//productos_impacto/impacto_parlantes5.jpg",
    "../../../../assets//productos_impacto/impacto_parlantes3.jpg",
  ]
  constructor(private productSvc:ProductsService) {}

  ngOnInit(): void {}
  
}
