import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { OrderService } from 'src/app/services/order/order.service';
import { ProductsService } from '../../services/products.service';
import { Productos } from 'src/app/admin/interface/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  index: number = 0;
  product: Productos;
  products:Productos[] = [];
  perView:number = 5;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productSvc: ProductsService,
    private orderSvc: OrderService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  console.log("tam",window.screen.width);
    this.perView = (window.screen.width < 480) ? 3 :5;
    const id = this.route.snapshot.params['id'];
    this.getProduct(id)
    this.productSvc.getAllProductsapi()
    .subscribe(res=>{
      this.products = res.map(el=>{
        let obj = el;
        obj.img = el.img[0]
        return obj
      });
    })
    this.subChanges()
  }

  getProduct(id){
    this.productSvc.getProductapi(id).subscribe((res: Productos) => {
      this.product = res;
    })
  }

  addCart() {
    this.orderSvc.addCart(this.product)
    this.openSnackBar(`+1 ${this.product.nombre} agregado al carrito`, 2000)
  }

  changeImg(e, index) {
    this.index = index;
  }

  openSnackBar(message: string, duration) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: duration
    });
  }

  subChanges(){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      const id = this.route.snapshot.paramMap.get('id');
      this.getProduct(id)
    });    
  }
}
