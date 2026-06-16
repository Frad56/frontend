import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type AlertType = 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="getAlertClass()">
      <div class="flex items-start">
        <div class="flex-1">
          <h3 *ngIf="title" class="font-medium mb-1">{{ title }}</h3>
          <p>{{ message }}</p>
        </div>
        <button
          *ngIf="dismissible"
          (click)="onDismiss()"
          class="ml-4 text-gray-400 hover:text-gray-600 transition"
        >
          ✕
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class AlertComponent {
  @Input() type: AlertType = 'info';
  @Input() message: string = '';
  @Input() title: string = '';
  @Input() dismissible: boolean = false;
  isVisible: boolean = true;

  getAlertClass(): string {
    const baseClass = 'p-4 rounded-lg mb-4';
    
    const typeClass = {
      'success': 'alert-success',
      'warning': 'alert-warning',
      'danger': 'alert-danger',
      'info': 'alert-info'
    }[this.type];

    const visibleClass = this.isVisible ? '' : 'hidden';

    return `${baseClass} ${typeClass} ${visibleClass}`;
  }

  onDismiss(): void {
    this.isVisible = false;
  }
}
