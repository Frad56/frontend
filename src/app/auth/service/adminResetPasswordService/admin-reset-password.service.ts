import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResetEmailRequest } from '../../auth/ResetEmailRequest';
import { UserResponse } from '../../auth/UserResponse';
import { ResetPasswordRequest } from '../../auth/ResetPasswordRequest';
import { OldPasswordVerification } from '../../auth/OldPasswordVerification';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminResetPasswordService {

  private readonly API = 'http://localhost:8080/api/auth';
  private http = inject(HttpClient);



  adminResetPassword(req:ResetPasswordRequest):Observable<string>{
    return this.http.put<string>(`${this.API}/reset-password`, req);
  }
  verifyPassword(OldPasswordVerification:OldPasswordVerification):Observable<string> {
    return this.http.post<string>(`${this.API}/verify-password`,OldPasswordVerification);
  }

}
