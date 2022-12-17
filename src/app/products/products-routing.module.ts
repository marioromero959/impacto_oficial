import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';
import { ProductsComponent } from './components/products/products.component';
import { PromoComponent } from './components/promo/promo.component';

const routes: Routes = [
  {
    path: '',
    component:ProductsComponent
  },
  {
    path: 'preventa',
    component:PromoComponent
  },
  {
    path: ':id',
    component:DetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
