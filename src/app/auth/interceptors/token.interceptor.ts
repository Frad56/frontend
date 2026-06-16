import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  console.log(' INTERCEPTOR CALLED FOR:', req.url); 

  const token = localStorage.getItem('token');

  const router = inject(Router);

  let clonedReq = req;

  if (token) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
        
      }
    });
    console.log(' Header ajouté:', clonedReq.headers.get('Authorization'));

  }
    return next(clonedReq).pipe(
      catchError((error) =>{

        if(error.status === 401){
          
          const msg = error.error?.error;
          if ( msg === "TOKEN_EXPIRED") {
          
            localStorage.removeItem('token');
            localStorage.removeItem('role');
          
            router.navigate(['/login']);
          } 
          else if (msg === 'Invalid token') {
            console.log('Token invalide ');
          }
            
        }
        return throwError (() => error);
      })
    );
  }

