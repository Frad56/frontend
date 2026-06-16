import { Component, Inject, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { AdminResetEmailService } from '../../../../../auth/service/adminResetEmail/admin-reset-email.service';
import { EmailServiceService } from '../../../../../auth/service/emailService/email-service.service';
import Swal from 'sweetalert2';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResetPasswordRequest } from '../../../../../auth/auth/ResetPasswordRequest';
import { AdminResetPasswordService } from '../../../../../auth/service/adminResetPasswordService/admin-reset-password.service';
import { OldPasswordVerification } from '../../../../../auth/auth/OldPasswordVerification';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-change-password',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './admin-change-password.component.html',
  styleUrl: './admin-change-password.component.css'
})
export class AdminChangePasswordComponent {

  location = inject(Location);
  private adminResetPasswordService=inject(AdminResetPasswordService);
  private adminEmailService = inject(AdminResetEmailService);
  private emailService = inject(EmailServiceService);
  private fb = inject(FormBuilder);


  loading = false;
  codeSent = false;
  email!:string;
  step:number = 1;

  showOldPassword = false;
  showNewPassword = false;

  changePasswordForm = this.fb.nonNullable.group({
    email: ['', Validators.required],
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    code: ['', Validators.required]
  });



  toggleOldPassword() {
    this.showOldPassword = !this.showOldPassword;
  }

  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }
 
  ngOnInit(){
    const lang = localStorage.getItem('lang') || 'en';

    this.adminEmailService.getMyEmail().subscribe({  
      next: (res) => {
        console.log('Current email:', res.email);
        this.email = res.email;
        this.changePasswordForm.patchValue({
          email:res.email
        })
      },
      error: (error) => {
        console.error('Error fetching current email:', error);
      }
    });
  }

  private sendCodeRequest(email: string) {
    return this.emailService.sendCode({ email });
  }

 
  onSendCode() {
    const oldPasswordData = this.mapFormToOldPasswordVerificationt();

    this.adminResetPasswordService.verifyPassword(oldPasswordData).subscribe({
   
      next: () => {
        alert("old password is correct");
        console.log("old password is correct");
        this.step = 2;
        this.sendCodeRequest(this.email).subscribe({
          next: (res) => {
            console.log('Email sent', res.message);
            
          },
          error: (error) => {
       
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.error?.message || 'Failed to send code'
            });
          }
        });
  
      },
      error: (error) => {
    
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error?.message || 'Old password incorrect'
        });
      }
    });
  }

  onResendCode(){
    this.step =2;
    this.sendCodeRequest(this.email).subscribe({
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

  mapFormToResetPasswordRequest(): ResetPasswordRequest {
    const form = this.changePasswordForm.getRawValue();
  
    return {
      email: form.email ,
      newPassword: form.newPassword ,
      code: form.code 
    };
  } 
  mapFormToOldPasswordVerificationt(): OldPasswordVerification {
    const form = this.changePasswordForm.getRawValue();
    return {
      email: form.email ,
      oldPassword: form.oldPassword ,
    };
  } 
  
  /*
  onVerifyOldPassword(){
    const OldPasswordVerification = this.mapFormToOldPasswordVerificationt();
    this.adminResetPasswordService.verifyPassword(OldPasswordVerification).subscribe({
      next: () =>{
        console.log("old password is correct");
        
      },
      error:(error) =>{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error?.message || 'Failed to change password. Please try again'
          });
      }
    })
  }
  */


 // private mapFormToResetPasswordRequest() : ResetPasswordRequest {
   // return this.changePasswordForm.getRawValue() as unknown as ResetPasswordRequest;
  
 // }
  resetPassword(){
  
    const resetPassword = this.mapFormToResetPasswordRequest();
    this.adminResetPasswordService.adminResetPassword(resetPassword).subscribe({
      next: () =>{
        console.log("password changed Sucessfuly");
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'password changed successfully',
          timer: 1700,
        })
      },
      error:(error) =>{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error?.message || 'Failed to change password. Please try again'
          });
      }
    })
  }
  goBack(){
    this.location.back();
  }
}
