import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { CreateComponent } from './components/create/create.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InventarioComponent } from './components/inventario/inventario.component';
import { ModalComponent } from './components/modal/modal.component';
import { ChartsComponent } from './components/charts/charts.component';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [NavComponent, CreateComponent, DashboardComponent, InventarioComponent, ModalComponent, ChartsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    // NgxChartsModule,
  ]
})
export class AdminModule { }
