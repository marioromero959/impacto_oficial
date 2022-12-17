import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './components/charts/charts.component';
import { CreateComponent } from './components/create/create.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { NavComponent } from './components/nav/nav.component';

const routes: Routes = [
  {
    path: '',
    component:NavComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'create',
        component:CreateComponent
      },
      {
        path:'inventario',
        component:InventarioComponent
      },
      {
        path:'estadisticas',
        component:ChartsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
