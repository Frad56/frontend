import { Component, inject } from '@angular/core';
import { AdminResetEmailService } from '../../../../../auth/service/adminResetEmail/admin-reset-email.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailServiceService } from '../../../../../auth/service/emailService/email-service.service';
import { EmailRequestDTO } from '../../../../../auth/authDTO/EmailRequestDTO';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../auth/service/auth.service';

@Component({
  selector: 'app-change-email',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './change-email.component.html',
  styleUrl: './change-email.component.css'
})
export class ChangeEmailComponent {

  private adminResetEmailService = inject(AdminResetEmailService);
  private emailService = inject(EmailServiceService);
  private fb = inject(FormBuilder);

  loading = false;
  codeSent = false;

  step: number = 1;
  oldEmail!: string;
  resetEmailForm = this.fb.group({
    newEmail :['', [Validators.required, Validators.email]],
    code:['', Validators.required]
  });
  
  ngOnInit(){
    this.adminResetEmailService.getMyEmail().subscribe({  
      
      next: (res) => {
        console.log('Current email:', res.email);
        this.oldEmail = res.email;

      },
      error: (error) => {
        console.error('Error fetching current email:', error);
      }
    });
  }

  private sendCodeRequest(email: string) {
    return this.emailService.sendCode({ email });
  }

  onSendCode(){
    const newEmail = this.resetEmailForm.get('newEmail')?.value;
    alert(newEmail)
      if (!newEmail) {
        console.error('New email is required');
        Swal.fire({
          text:'New email is required'
        });
        return;
      }
      this.loading = true;

        this.sendCodeRequest(newEmail).subscribe({
        next: (res) => {

          console.log('Email sent', res.message);
          this.step = 2; 
          this.loading = false;
        },
        error: (error) => {
          console.error(error)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error?.message || 'Failed to send code. Please try again'
          });
          
          this.loading = false;}
        
      });
  }
  onVerifyAndChange(){
      const newEmail = this.resetEmailForm.get('newEmail')?.value;
      const code = this.resetEmailForm.get('code')?.value;

      const req = {
        oldEmail: this.oldEmail,
        newEmail: newEmail as string,
        code :code as string
      }
      this.loading = true;
      if (!newEmail || !code) {
        console.error('New email and Code are required');
        return;
      }
      
      this.adminResetEmailService.resetEmail(req).subscribe({
        next: (res) => {
          this.loading = false;
          
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Email changed successfully',
            timer: 1700,
            showConfirmButton: false
          })
          window.location.reload();

        },
        error: (error) => {
          console.error(error)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error?.message || 'Failed to change email. Please try again'
          });
          this.loading = false;}
      });
     

  }

  onResendCode(){
    const newEmail = this.resetEmailForm.get('newEmail')?.value; 
    if(!newEmail){
      console.error('New email is required to resend code');
      return;
    }
    this.sendCodeRequest(newEmail).subscribe({
      next: (res) => {
        console.log('Code resent', res.message);
        Swal.fire({
          text: 'Verification code resent. Please check your email'
        });
      },
      error: (error) => {
        console.error(error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error?.message || 'Failed to resend code. Please try again'
        });
      }
    });
  }
 
  onNext() {
    if (this.step === 1) {
      this.onSendCode();
    
    } else {
  
      this.onVerifyAndChange();
    }
  }

  
}
