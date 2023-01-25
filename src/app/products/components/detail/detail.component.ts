import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OrderService } from 'src/app/services/order/order.service';
import { ProductsService } from '../../services/products.service';
import { Productos } from 'src/app/admin/interface/product';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  index: number = 0;

  constructor(
        @Inject(MAT_DIALOG_DATA) 
        public product: any,
        private route:ActivatedRoute,
        private productSvc:ProductsService,
        private orderSvc:OrderService,
        public dialogRef: MatDialogRef<DetailComponent>,
        private _snackBar: MatSnackBar)
         { }

  ngOnInit(): void {
  }

  addCart(product:Productos){
    this.orderSvc.addCart(product)
    this.openSnackBar("+1 Producto agregado al carrito",2000)
  }

  changeImg(e,index){
    this.index = index;
  }

  openSnackBar(message:string,duration) {
    this._snackBar.open(message, '', {
      horizontalPosition:'center',
      verticalPosition: 'top',
      duration:duration
    });
  }
}
