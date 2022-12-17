import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './components/detail/detail.component';
import { ProductsPipe } from './pipes/products.pipe';
import { PromoComponent } from './components/promo/promo.component';


@NgModule({
  declarations: [
    ProductsComponent,
    DetailComponent,
    ProductsPipe,
    PromoComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports:[
    PromoComponent
  ]
})
export class ProductsModule { }
