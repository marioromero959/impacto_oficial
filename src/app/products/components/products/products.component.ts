import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';


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
  
  totalPages:number = 0
  totalProducts = 12
  idCategoria:any

  skip:number = 0

  @Output() page: EventEmitter<PageEvent>
  @ViewChild(MatPaginator) paginator: MatPaginator;

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
    if(category){
      this.filterControl.setValue(category)
    }
    this.cargarCategorias(category);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      document.body.scrollTop = 0;
    });
    this.subChanges()
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event) => {
      this.skip = event.pageIndex*this.totalProducts
      this.cargarCategorias(this.filterControl.value)
    });
  }


  subChanges() {
    this.filterControl.valueChanges
    .subscribe(cat=>{
      if(cat){
        this.idCategoria = this.categorias.find(c=>c.nombre == cat)._id
        this.cargarProductos(this.idCategoria)
      }
    })

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
      this.filterControl.setValue(this.route.snapshot.paramMap.get('category'))
      this.cargarCategorias(this.filterControl.value)
    });
  }

  cargarProductos(idCategoria?){
    //si mando una categoria 
   if(idCategoria){
     this.productSvc.getAllProductsapi(this.totalProducts,this.skip,idCategoria)
     .pipe(map((res:any) => {
       this.totalPages = res.totalPages
       this.productos = res.productos;
      })
      ).subscribe()
    }else{
      this.productSvc.getAllProductsapi(this.totalProducts,this.skip)
      .pipe(map((res:any) => {
        this.totalPages = res.totalPages
        this.productos = res.productos;
       })
       ).subscribe()
    }
  }


  cargarCategorias(categoria:string){
      this.adminSvc.getCategories().pipe(
        map((res: any) => {
          this.categorias = [{ nombre: 'All' }, ...res.categorias];
          if(categoria){
            this.idCategoria = this.categorias.find(c=>c.nombre == categoria)._id
          }
        })
        ).subscribe(res=>{
          this.cargarProductos(this.idCategoria)
      })
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
