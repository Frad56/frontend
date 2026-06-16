import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  template: `
    <div class="flex flex-col h-screen bg-gray-50">
      <app-navbar></app-navbar>
      
      <main class="flex-1 overflow-auto">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <router-outlet></router-outlet>
        </div>
      </main>

      <footer class="bg-white border-t border-gray-200 py-4 px-6">
        <div class="container mx-auto flex justify-between items-center">
          <p class="text-sm text-gray-600">© 2024 Stock Management. All rights reserved.</p>
          <div class="flex gap-4 text-sm text-gray-600">
            <a href="#" class="hover:text-primary-600 transition">Privacy</a>
            <a href="#" class="hover:text-primary-600 transition">Terms</a>
            <a href="#" class="hover:text-primary-600 transition">Support</a>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: []
})
export class MainLayoutComponent {}
