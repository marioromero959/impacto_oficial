import { Component, OnInit } from '@angular/core';
import Swiper, { Autoplay } from 'swiper';
import { Productos } from 'src/app/admin/interface/product';
import { ProductsService } from 'src/app/products/services/products.service';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  products$: Observable<any>

  constructor(private productSvc:ProductsService ) { }

  ngOnInit(): void {
     this.products$ =  this.productSvc.getAllProductsapi();
  }
  
  ngAfterViewInit(){
    Swiper.use([Autoplay]);
    new Swiper(".mySwiper", {
      direction:'horizontal',
      slidesPerView: 5,
      spaceBetween: 30,
      autoplay:{
        disableOnInteraction:false,
        delay:2000,
        stopOnLastSlide:false,
      },
      loop:true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }
  
}