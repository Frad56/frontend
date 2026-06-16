import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common'; 
import { LoginResponse } from '../auth/LoginResponse';
import { MatFormField, MatError, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ForgotPasswordComponent } from '../forgotPasswordManagement/forgot-password/forgot-password.component';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,
    MatButtonModule,
    MatCardModule, MatIconModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  
  hidePassword = true;
  userForm: FormGroup;
  errorMessage = '';

  hide = true;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      rememberMe: [false] 
    });
  }

  login() {
    if (this.userForm.invalid) return;    

    const data = this.userForm.value;
    console.log("rememberME: "+data.rememberMe);

    this.authService.login(this.userForm.value).subscribe({
      next: (response: LoginResponse) => {
  
        const role = response.role?.trim();
        console.log('Navigation avec role:', JSON.stringify(role));
        if (response.role === 'ADMIN') {
          this.router.navigate(['/admin-dashboard']);
        } else if (response.role === 'WORKER') {
          this.router.navigate(['/worker-dashboard']);
        } else if (response.role === 'STOCK_KEEPER') {
          this.router.navigate(['/magasiner-dashboard']);
        }
      },
      error: () => {
        this.errorMessage = 'User name or password invalid';
      }
    });
  }

  
}