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
import { catchError } from 'rxjs/operators';
import {Router,ActivatedRoute} from '@angular/router'

@Injectable({providedIn:'root'})
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private router:Router,private route:ActivatedRoute) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let token = localStorage.getItem('token');
    
    let headers = new HttpHeaders({
      'x-token': token
    });

    const reqClone = req.clone({
      headers:headers
    });

    return next.handle(reqClone).pipe(
      catchError((err)=>{
        // if(this.router.url == '/register'){
          // return throwError(err.error.errors[0].msg);
        // }
        // if(this.router.url == '/login'){
          // return throwError(err.error.msg); 
        // }
        return throwError(err); 
      })
    );

  }
}
