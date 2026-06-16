import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmailServiceService } from '../../service/emailService/email-service.service';
import Swal from 'sweetalert2';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailRequestDTO } from '../../authDTO/EmailRequestDTO';
import { ResetPasswordRequest } from '../../auth/ResetPasswordRequest';
import { AdminResetPasswordService } from '../../service/adminResetPasswordService/admin-reset-password.service';
import { VerificationCode } from '../../authDTO/VerificationCode';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
 
  private emailService = inject(EmailServiceService);


  codeSent = false;
  email!:string;
  step:number = 1;

  showNewPassword = false;

  private resetPasswordService=inject(AdminResetPasswordService);
  fb = inject(FormBuilder);
  changePasswordForm = this.fb.nonNullable.group({
    email: ['', Validators.required],
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    code: ['', Validators.required]
  });


  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }
  
  mapFormToResetPasswordRequest(): ResetPasswordRequest {
    const form = this.changePasswordForm.getRawValue();
  
    return {
      email: form.email ,
      newPassword: form.newPassword ,
      code: form.code 
    };
  } 
loading = false;
verifyEmail() {
  const email = this.changePasswordForm.value.email;
  this.loading = true;
  this.emailService.VerifyEmailExistence({ email } as EmailRequestDTO).subscribe({
    next: () => {
      this.emailService.sendCode({ email } as EmailRequestDTO).subscribe({
        next: (res) => {
          this.loading = false;
          Swal.fire('Success', res.message, 'success');
          this.step = 2; 
        },
        error: (error) => {
          this.loading = false;
          Swal.fire('Error', error.error.message, 'error');
        }
      });
    },
    error: (error) => {
      this.loading = false;
      Swal.fire('Error', error.error.message, 'error');
    }
  });
}

confirmCode(): void {
  this.loading = true;
  const payload: VerificationCode = {
    email: this.changePasswordForm.value.email!,
    code: this.changePasswordForm.value.code!
  };
  this.emailService.verifyCode(payload).subscribe({
    next: () => {
      this.loading = false;
      this.step = 3;
    },
    error: (error) => {
      this.loading = false;
      Swal.fire('Error', error.error?.message || 'Invalid or expired code', 'error');
      this.changePasswordForm.get('code')?.reset(); 
  
    }
  });
}

resetPassword() {
  const resetPayload = this.mapFormToResetPasswordRequest();

  this.resetPasswordService.adminResetPassword(resetPayload).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Password changed successfully',
        timer: 1700,
      });
    },
    error: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.error?.message || 'Failed to change password. Please try again'
      });
    }
  });
}

}