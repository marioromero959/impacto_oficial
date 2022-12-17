import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { OrderService } from 'src/app/services/order/order.service';
import { Productos } from 'src/app/admin/interface/product';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modalError/modal/modal.component';
import { DetailComponent } from '../detail/detail.component';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  filterControl = new FormControl('all');

  productos:any = []
  showProducts = true
  constructor(
    private productSvc:ProductsService,
    private orderSvc:OrderService,
    public dialog:MatDialog,
    public router:Router,
    ) { }

  ngOnInit(){
    this.productSvc.getAllProductsapi().subscribe(res=>{
     this.productos = res;
    })

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      document.body.scrollTop = 0;
  });
  }

  addCart(product:Productos){
    const dialogRef = this.dialog.open(DetailComponent,{
      disableClose:false,
      data:product
    }); 
  }
}
