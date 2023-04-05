import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FooterComponent } from './footer/components/footer.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { InterceptorInterceptor } from './services/interceptor/interceptor.interceptor';
import { ModalComponent } from './modalError/modal/modal.component';
import { SharedModule } from './shared/shared.module';
import { EnviosComponent } from './envios/components/envios/envios.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LayoutComponent,
    AppComponent,
    ModalComponent,
    EnviosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:InterceptorInterceptor,
    multi: true,
  }],

  bootstrap: [AppComponent]
})
export class AppModule { }
