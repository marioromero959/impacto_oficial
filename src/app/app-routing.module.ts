import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
    {
      path: '',
      pathMatch:'full',
      redirectTo: '/home',
    },
    {
      path: 'home',
      loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
      data: { animation: 'animationHome' }
    },
    {
      path: 'login',
      loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
      data: { animation: 'animationLogin' }
    },
    {
      path: 'register',
      loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
      data: { animation: 'animationRegister' }
    },
    {
      path: 'products',
      loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
      data: { animation: 'animationProducts' }
    },
    {
      path: 'contact',
      loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
      data: { animation: 'animationContact' }
    },
    {
      path: 'order',
      loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
      data: { animation: 'animationOrder' }
    },
    {
      path: 'detail',
      loadChildren: () => import('./detalle-pago/detalle-pago.module').then(m => m.DetallePagoModule),
      data: { animation: 'animationOrder' }
    },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    enableTracing:false,
    scrollPositionRestoration:'enabled',
    preloadingStrategy:PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
