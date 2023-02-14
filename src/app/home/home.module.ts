import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './componentes/home/home.component';
import { MaterialModule } from '../material/material.module';
import { ProductsModule } from '../products/products.module';
import { IngresosComponent } from './componentes/ingresos/ingresos.component';

@NgModule({
  declarations: [
    HomeComponent,
    IngresosComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ProductsModule,
  ],
  providers:[DecimalPipe]
})
export class HomeModule { }
