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
import {catchError, map} from "rxjs/operators";
import { AuthService } from '../common/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.authService.getAuthToken();
    if (token) {
      request = request.clone({
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${token}`
        })
      });
    }
    return next.handle(request).pipe(
      map(res => {
        return res;
      }),catchError((error:HttpErrorResponse) => {
        let errorMsz = '';
        if(error instanceof HttpErrorResponse){
          if(error.status==401)
          errorMsz = `Error code ${error.status} Error Message ${error.message}`;
          this.toastr.error(error.error.message);
        } else{
          errorMsz = `Error code ${error} Error Message ${error}`;
        }
        return throwError(errorMsz);
      }));
  }
}
