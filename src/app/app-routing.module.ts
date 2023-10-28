import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './shared/admin-guard.guard';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';

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
      path: 'reset-password',
      loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule),
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
      path: 'envios',
      loadChildren: () => import('./envios/envios.module').then(m => m.EnviosModule),
      data: { animation: 'animationOrder' }
    },
  {
    path: 'admin',
    canActivate:[ AdminGuard ],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '**',
    component: NotfoundComponent
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
