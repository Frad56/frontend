import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {


  private auth= inject(AuthService);
  private router= inject(Router);
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.auth.getToken();
  
    if (!token) {
      console.warn('Guard: pas de token');
      this.router.navigate(['/login']);
      return false;
    }
  
    const expectedRoles = route.data['role'] as string[];
    const userRole = localStorage.getItem('role')?.trim(); 
  
    console.log('Guard check:');
    console.log('userRole:', JSON.stringify(userRole));
    console.log('expectedRoles:', JSON.stringify(expectedRoles));
    console.log('includes?', expectedRoles?.includes(userRole!));
  
    if (expectedRoles && !expectedRoles.includes(userRole!)) {
      console.warn('Guard: role non autorisé');
      this.router.navigate(['/login']);
      return false;
    }
  
    return true;
  }

}