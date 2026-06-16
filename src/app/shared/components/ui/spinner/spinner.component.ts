import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type SpinnerSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="getSpinnerClass()">
      <div class="spinner"></div>
      <p *ngIf="message" class="mt-2 text-gray-600">{{ message }}</p>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `]
})
export class SpinnerComponent {
  @Input() size: SpinnerSize = 'md';
  @Input() message: string = '';

  getSpinnerClass(): string {
    const baseClass = 'flex flex-col items-center justify-center';
    
    const sizeClass = {
      'sm': 'text-sm',
      'md': 'text-base',
      'lg': 'text-lg'
    }[this.size];

    return `${baseClass} ${sizeClass}`;
  }
}
