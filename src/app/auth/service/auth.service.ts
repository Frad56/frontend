import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest } from '../auth/LoginRequest';
import { LoginResponse } from '../auth/LoginResponse';
import { SignupRequest } from '../auth/SignupRequest';
import { UserDTO } from '../authDTO/UserDTO.dto';
import { ApiResponse } from '../authDTO/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) {}


  private codeSubject = new BehaviorSubject<string | null>(null);
  code$ = this.codeSubject.asObservable();

 
  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API}/signin`, data).pipe(
      tap(response => {
        const cleanRole = response.role?.trim();
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', cleanRole);
        console.log(' Role stocké:', JSON.stringify(cleanRole));
      })
    );
  }
  
  getIsEmailChanged(){
   return this.codeSubject.value
  }
  
  signup(data: UserDTO): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.API}/signup`, data);
  }


  register(data: SignupRequest): Observable<any> {  
    return this.http.post(`${this.API}/signup`, data);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}