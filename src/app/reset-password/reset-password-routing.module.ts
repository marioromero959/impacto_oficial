import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetComponent } from './component/reset.component';

const routes: Routes = [
  {
    path: '',
    component:ResetComponent
  },
  {
    path: ':id',
    component:ResetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetPasswordRoutingModule { }
