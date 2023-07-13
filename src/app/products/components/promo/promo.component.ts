import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OrderService } from 'src/app/services//order/order.service';
import { ProductsService } from '../../services/products.service';
// import Swiper, { Navigation, Pagination,Autoplay } from 'swiper';
import { Productos } from 'src/app/admin/interface/product';
import { DetailComponent } from '../detail/detail.component';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit{

  products:Productos[] = [];

  constructor(
    private productSvc:ProductsService,
    private orderSvc:OrderService,
    public dialog:MatDialog,
    ) { }

  ngOnInit(): void {
    this.productSvc.getAllProductsapi()
    .pipe(map((res:any)=> res.productos))
    .subscribe(res=>{
      this.products = res;
    })
  }

  // ngAfterViewInit(){
  //   Swiper.use([Navigation, Pagination,Autoplay,]);
  //   const swiper = new Swiper('.swiper', {
  //     autoplay:{
  //       disableOnInteraction:false,
  //       delay:4000,
  //       stopOnLastSlide:false,
  //     },
  //   });
  // }

   addCart(product:Productos){
     const dialogRef = this.dialog.open(DetailComponent,{
       disableClose:false,
       data:product
     }); 
   }
}
