import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="getBadgeClass()">
      {{ label }}
    </span>
  `,
  styles: []
})
export class BadgeComponent {
  @Input() label: string = '';
  @Input() variant: BadgeVariant = 'primary';

  getBadgeClass(): string {
    const baseClass = 'inline-block px-3 py-1 rounded-full text-sm font-medium';
    
    const variantClass = {
      'primary': 'badge-primary',
      'secondary': 'badge-secondary',
      'success': 'badge-success',
      'danger': 'badge-danger',
      'warning': 'badge-warning'
    }[this.variant];

    return `${baseClass} ${variantClass}`;
  }
}
