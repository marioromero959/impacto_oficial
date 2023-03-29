import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { OrderService } from 'src/app/services/order/order.service';
import { Productos } from 'src/app/admin/interface/product';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from '../detail/detail.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AdminService } from '../../../admin/services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  filterControl = new FormControl('All');
  productos: any = []
  categorias: any = []
  showProducts = true;
  showSelector:boolean = true;

  constructor(
    private productSvc: ProductsService,
    private orderSvc: OrderService,
    public dialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute,
    private adminSvc: AdminService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.showSelector = !this.router.url.split('/').includes('categoria');
    
    const { category } = this.route.snapshot.params;
    if(category)
    this.filterControl.setValue(category)
    this.cargarDatosGenerales().subscribe();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      document.body.scrollTop = 0;
    });
    this.subChanges()
  }

  subChanges() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.filterControl.setValue(this.route.snapshot.paramMap.get('category'))
    });
  }

  cargarDatosGenerales(): Observable<any> {
    const datosGenerales = forkJoin({
      productos: this.productSvc.getAllProductsapi().pipe(
        map((res) => {
          this.productos = res;
        })
      ),
      categorias: this.adminSvc.getCategories().pipe(
        map((res: any) => {
          this.categorias = [{ nombre: 'All' }, ...res.categorias];
        })
      ),
    });
    return datosGenerales;
  }

  addCart(product: Productos) {
    this.orderSvc.addCart(product)
    this.openSnackBar(`+1 ${product.nombre} agregado al carrito`, 2000)
  }
  openSnackBar(message: string, duration) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: duration
    });
  }
  showDetails(product: Productos) {
    this.router.navigate([`products/${product._id}`])
  }
}
