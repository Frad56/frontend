import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="getButtonClass()"
      [type]="type"
      [disabled]="disabled || isLoading"
      (click)="onClick.emit()"
    >
      <span *ngIf="!isLoading">{{ label }}</span>
      <div *ngIf="isLoading" class="spinner"></div>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class ButtonComponent {
  @Input() label: string = 'Click me';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Output() onClick = new EventEmitter<void>();

  getButtonClass(): string {
    const baseClass = 'font-medium rounded-lg transition duration-200 font-medium cursor-pointer';
    
    const sizeClass = {
      'sm': 'px-3 py-1 text-sm',
      'md': 'px-4 py-2 text-base',
      'lg': 'px-6 py-3 text-lg'
    }[this.size];

    const variantClass = {
      'primary': 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
      'secondary': 'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800',
      'outline': 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100',
      'danger': 'bg-danger text-white hover:bg-red-600 active:bg-red-700',
      'success': 'bg-success text-white hover:bg-green-600 active:bg-green-700'
    }[this.variant];

    const disabledClass = (this.disabled || this.isLoading) ? 'opacity-50 cursor-not-allowed' : '';

    return `${baseClass} ${sizeClass} ${variantClass} ${disabledClass}`;
  }
}
