import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { FilterPipe } from './filter.pipe';



@NgModule({
  declarations: [
    LoaderComponent,
  ],
  imports: [
    CommonModule, 
    MaterialModule
  ],
  exports:[
    LoaderComponent
  ]
})
export class SharedModule { }
