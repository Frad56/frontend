import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex h-screen bg-gradient-to-br from-primary-600 to-primary-900">
      <!-- Left side - Branding -->
      <div class="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
        <div class="text-white text-center">
          <div class="text-6xl mb-6">📦</div>
          <h1 class="text-4xl font-bold mb-4">Stock Management</h1>
          <p class="text-xl text-primary-100">
            Manage your hardware inventory efficiently and effectively
          </p>
        </div>
      </div>

      <!-- Right side - Form -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div class="w-full max-w-md">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AuthLayoutComponent {}
