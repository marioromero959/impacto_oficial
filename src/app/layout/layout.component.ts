import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { OrderService } from '../services/order/order.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Productos } from 'src/app/admin/interface/product';
import { slideInAnimation } from '../shared/animations';
import { AdminService } from '../admin/services/admin.service';
 
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations:[
    slideInAnimation
  ]
})
export class LayoutComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay(850)
  );
    products$:Observable<Productos[]>;
    productos:any;
    token:string;
    session:string = 'Iniciar'
    count
    categorias

    constructor(
    private adminSvc: AdminService,
    private route:ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private orderSvc:OrderService,
    private router:Router,
    private loginSvc:LoginService
    ){

    this.products$ = this.orderSvc.cart$
    this.products$.subscribe(products=>{
      this.productos = products;
    })
    this.token = localStorage.getItem('token');
    this.loginSvc.user$.subscribe(res=>{
      if(res  || this.token){
        this.session = 'Cerrar'
      }
    }) 

  }

  ngOnInit() {
    this.adminSvc.getCategories().subscribe((res) => {
      this.categorias = res['categorias'].map((c) =>c.nombre);
    });
  }
  
  
  trackByFn(idx: number, item: any) {
    return item.nombre;
  } 

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  goToOrder(){
    this.router.navigate(['/order'])
  }
  
public badge(){
  let badge = this.productos
  .map(product=>product.cantidad)
  .reduce((a,b)=>a+b,0);
  return badge
}

  public total() {
    let total = this.productos
    .map(product=>product.precio*product.cantidad)
    .reduce((a,b)=>a+b,0);
    return total;
  }

  goToRegister(){
    this.router.navigate(['/register'])
  }

  outSession(){
    if(this.session === 'Cerrar'){
      localStorage.removeItem('token')
      localStorage.removeItem('currentUserEmail')
      localStorage.removeItem('currentUserName')
      this.session = 'Iniciar'
    }
  }

}
