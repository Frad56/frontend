import { Component, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { MatFormField, MatError, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { Location } from '@angular/common';
@Component({
  selector: 'app-sigup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,
    MatFormField,
    MatInput,
    MatButtonModule,
    MatCardModule, MatLabel,
      MatSelectModule],
  templateUrl: './sigup.component.html',
  styleUrl: './sigup.component.css'
})
export class SigupComponent {
  hidePassword = true;
  userForm!: FormGroup;
  errorMessage = '';
  private authService = inject(AuthService);
  location = inject(Location);

  constructor(private fb:FormBuilder)
    {
      this.userForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4)]],
        role: ['', Validators.required],
        email: ['', Validators.required],
        phoneNumber: ['', Validators.required]
      });
    }


    signup() {
      if(this.userForm.invalid) return;

      this.authService.signup(this.userForm.value).subscribe({
        next: (response) => {
          alert(response.message)
        },
        error: (error) => {
          this.errorMessage = 'Error:',error;
        }
      });

    }

  goBack() {
    this.location.back();
  }
}
