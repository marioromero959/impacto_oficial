import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import {Router,ActivatedRoute} from '@angular/router'
import { SpinnerService } from '../spinner/spinner.service';

@Injectable({providedIn:'root'})
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private router:Router,private route:ActivatedRoute, private spinnerSvc:SpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerSvc.show();

    // let token = localStorage.getItem('token');
    
    // let headers = new HttpHeaders({
    //   'x-token': token
    // });

    // const reqClone = req.clone({
    //   headers:headers
    // });

    // return next.handle(reqClone).pipe(
    //   catchError((err)=>{
    //     return throwError(err); 
    //   })
    // );

    return next.handle(req).pipe(
      finalize(()=>{
        this.spinnerSvc.hide()
      })
    )
  }
}
