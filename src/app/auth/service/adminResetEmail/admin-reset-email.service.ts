import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResetEmailRequest } from '../../auth/ResetEmailRequest';

import { OldPasswordVerification } from '../../auth/OldPasswordVerification';

@Injectable({
  providedIn: 'root'
})
export class AdminResetEmailService {

  private readonly API = 'http://localhost:8080/api/auth';
  private http = inject(HttpClient);

  getMyEmail() {
    return this.http.get<{ email: string }>(`${this.API}/me/email`);
  }

  resetEmail(resetEmailRequest:ResetEmailRequest) {
    return this.http.put<{message:string}>(`${this.API}/admin/reset`,resetEmailRequest);
  }



  ///verify-password
}
