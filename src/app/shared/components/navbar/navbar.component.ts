import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-white shadow-md sticky top-0 z-50">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center gap-2">
            <div class="text-primary-600 text-2xl font-bold">📦</div>
            <span class="text-xl font-bold text-gray-900">Stock Manager</span>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center gap-6">
            <a routerLink="/dashboard" class="text-gray-700 hover:text-primary-600 transition">Dashboard</a>
            <a routerLink="/sales" class="text-gray-700 hover:text-primary-600 transition">Sales</a>
            <a routerLink="/purchases" class="text-gray-700 hover:text-primary-600 transition">Purchases</a>
            <a routerLink="/partners" class="text-gray-700 hover:text-primary-600 transition">Partners</a>
            <a routerLink="/stock" class="text-gray-700 hover:text-primary-600 transition">Stock</a>
          </div>

          <!-- User Menu -->
          <div class="flex items-center gap-4">
            <button (click)="toggleMobileMenu()" class="md:hidden text-gray-700 hover:text-primary-600">
              <span class="text-2xl">☰</span>
            </button>
            <button (click)="logout()" class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
              Logout
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div *ngIf="isMobileMenuOpen()" class="md:hidden border-t border-gray-200 py-4 space-y-2">
          <a routerLink="/dashboard" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Dashboard</a>
          <a routerLink="/sales" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Sales</a>
          <a routerLink="/purchases" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Purchases</a>
          <a routerLink="/partners" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Partners</a>
          <a routerLink="/stock" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Stock</a>
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class NavbarComponent {
  isMobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  logout(): void {
    // This will be integrated with auth service
    console.log('Logout clicked');
  }
}
