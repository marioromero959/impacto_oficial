import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { OrderService } from 'src/app/services/order/order.service';
import { Productos } from 'src/app/admin/interface/product';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modalError/modal/modal.component';
import { DetailComponent } from '../detail/detail.component';
import { NavigationEnd, Router } from '@angular/router';
import { finalize, Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminService } from '../../../admin/services/admin.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  filterControl = new FormControl('All');

  productos:any = []
  categorias:any = []
  showProducts = true

  constructor(
    private productSvc:ProductsService,
    private orderSvc:OrderService,
    public dialog:MatDialog,
    public router:Router,
    private adminSvc:AdminService
    ) { }

  ngOnInit(){
    this.cargarDatosGenerales()
    // .pipe(
    //   finalize(() => {})
    // )
    .subscribe();

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      document.body.scrollTop = 0;
  });
  }


  cargarDatosGenerales():Observable<any>{
    const datosGenerales = forkJoin({
      productos: this.productSvc.getAllProductsapi().pipe(
        map((res) => {
          this.productos = res;
        })
      ),
      categorias: this.adminSvc.getCategories().pipe(
        map((res:any) => {
          this.categorias = [{nombre:'All'},...res.categorias];
        })
      ),
    });
    return datosGenerales;
  }

  addCart(product:Productos){
    const dialogRef = this.dialog.open(DetailComponent,{
      disableClose:false,
      data:product
    }); 
  }
}
