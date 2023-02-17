import { Component, OnInit, HostListener } from '@angular/core';
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
  carouselHeigth:string = '70vh';
  itemsPromo:number = 5;

  cards = [
    {img:"../../../assets/img-velka/frase9.jpg"},
    {img:"../../../assets/img-velka/post40.jpg"},
    {img:"../../../assets/img-velka/frase2.jpg"}
  ]

  imagenesCarousel = [
    {img:"../../../../assets/banner1.jpeg"},
    {img:"../../../../assets/banner2.svg"},
  ]
  constructor(private productSvc:ProductsService) {}

  ngOnInit(): void {
    this.carouselHeigth = (window.innerWidth < 767) ? '30vh' : '100vh';
    this.itemsPromo = (window.innerWidth < 767) ? 1 : 5;
    this.productSvc.getAllProductsapi()
    .subscribe(res=>{
      this.products = res.map(el=>{
        let obj = el;
        obj.img = el.img[0]
        return obj
      });
    })
  }
  @HostListener('window:resize', ['$event']) 
  doSomething() {
    if(window.innerWidth < 767){
      this.carouselHeigth = '30vh'; 
      this.itemsPromo = 1;
    }else{
      this.carouselHeigth = '70vh'; 
      this.itemsPromo = 5;
    }
  }
}
