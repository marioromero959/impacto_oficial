import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router} from '@angular/router';
import { OrderService } from '../services/order/order.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Productos } from 'src/app/admin/interface/product';
import { slideInAnimation } from '../shared/animations';
import { AdminService } from '../admin/services/admin.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class LayoutComponent implements OnInit {

  products$: Observable<Productos[]>;
  productos: any;
  token: string;
  session: string = 'Iniciar'
  count
  categorias
  existsToken:boolean = false;
  subMenuOpen:boolean = false;

  @ViewChild('nav') nav: ElementRef;
  @ViewChild('menuButton') menuButton: ElementRef;
  @ViewChild('productSubMenu') productSubMenu: ElementRef;

  constructor(
    private adminSvc: AdminService,
    private orderSvc: OrderService,
    private router: Router,
    private render: Renderer2,
    private loginSvc: LoginService
  ) {
    this.products$ = this.orderSvc.cart$
    this.products$.subscribe(products => {
      this.productos = products;
    })
      this.existsToken = localStorage.getItem('token') ? true : false; 
    }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    if(window.innerWidth > 767){
      this.render.removeClass(this.nav.nativeElement, "animenu__nav--active");
      this.render.removeClass(this.menuButton.nativeElement, "animenu__btn--active");
    }
  }

  ngOnInit() {
    this.adminSvc.getCategories().subscribe((res) => {
      this.categorias = res['categorias'].map((c) => c.nombre);
    });
    this.subChanges()
  }

  subChanges() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
      ).subscribe(event => {
      this.existsToken = localStorage.getItem('token') ? true : false; 
      //cada que cambia la ruta, cerramos el menu
      this.render.removeClass(this.nav.nativeElement, "animenu__nav--active");
      this.render.removeClass(this.menuButton.nativeElement, "animenu__btn--active");
    });
  }

  goToOrder() {
    this.router.navigate(['/order'])
  }

  public badge() {
    let badge = this.productos
      .map(product => product.cantidad)
      .reduce((a, b) => a + b, 0);
    return badge
  }

  public total() {
    let total = this.productos
      .map(product => product.precio * product.cantidad)
      .reduce((a, b) => a + b, 0);
    return total;
  }

  goToRegister() {
    this.router.navigate(['/register'])
  }

  outSession() {
      localStorage.removeItem('token')
      localStorage.removeItem('currentUserEmail')
      localStorage.removeItem('currentUserName')
      window.location.reload()
  }


  changeScreen(event: any) {
    if (!event.target.classList.contains("animenu__btn--active")) {
      this.render.addClass(event.target, "animenu__btn--active");
      this.render.addClass(this.nav.nativeElement, "animenu__nav--active");
    } else {
      this.render.removeClass(this.nav.nativeElement, "animenu__nav--active");
      this.render.removeClass(event.target, "animenu__btn--active");
    }
  }

    triggerProudctMenu(){
      this.subMenuOpen = !this.subMenuOpen;
      if(this.subMenuOpen){
        this.render.addClass(this.productSubMenu.nativeElement, "show");
      }else{
        this.render.removeClass(this.productSubMenu.nativeElement, "show");
      }
      
    }

}
