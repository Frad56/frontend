import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EmailRequestDTO } from '../../authDTO/EmailRequestDTO';
import { VerificationCode } from '../../authDTO/VerificationCode';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  private readonly API = 'http://localhost:8080/api/email';
  private readonly API_2 = 'http://localhost:8080/api/auth';

  private http = inject(HttpClient);


  sendCode(email:EmailRequestDTO){
    return this.http.post<{message:string}>(`${this.API}/send-email`, email);
  }

  verifyCode(verificationCode:VerificationCode){
    return this.http.post<{message:string}>(`${this.API}/verify-code`, verificationCode);
  }
  verifyEmail(email:EmailRequestDTO){
    return this.http.post<{message:string}>(`${this.API_2}/verify-email`, email);
  }
  
  VerifyEmailExistence(email:EmailRequestDTO){
    return this.http.post<{message:string}>(`${this.API_2}/verify-email-exists`, email);
  }

}
