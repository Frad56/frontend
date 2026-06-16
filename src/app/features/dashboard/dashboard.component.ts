import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatCardModule],
  template: `
    <mat-toolbar color="primary" class="mb-4">
      <mat-icon>dashboard</mat-icon>
      <span class="ml-2">Dashboard</span>
    </mat-toolbar>

    <div class="dashboard-grid">
      <mat-card class="card">
        <mat-card-title>Sales</mat-card-title>
        <mat-card-content>
          <h2>1,234</h2>
          <p>Last 30 days</p>
        </mat-card-content>
      </mat-card>

      <mat-card class="card">
        <mat-card-title>Products</mat-card-title>
        <mat-card-content>
          <h2>342</h2>
          <p>Active products</p>
        </mat-card-content>
      </mat-card>

      <mat-card class="card">
        <mat-card-title>Suppliers</mat-card-title>
        <mat-card-content>
          <h2>58</h2>
          <p>Connected</p>
        </mat-card-content>
      </mat-card>

      <mat-card class="card">
        <mat-card-title>Low stock</mat-card-title>
        <mat-card-content>
          <h2>12</h2>
          <p>Items below threshold</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
}
