import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetallePagoRoutingModule } from './detalle-pago-routing.module';
import { DetalleComponent } from './components/detalle/detalle.component';


@NgModule({
  declarations: [
    DetalleComponent
  ],
  imports: [
    CommonModule,
    DetallePagoRoutingModule
  ]
})
export class DetallePagoModule { }
