import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type InputType = 'text' | 'email' | 'password' | 'number' | 'date' | 'tel' | 'url';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mb-4">
      <label *ngIf="label" class="block text-sm font-medium text-gray-700 mb-2">
        {{ label }}
        <span *ngIf="required" class="text-danger">*</span>
      </label>
      <input
        [type]="type"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [value]="value"
        [required]="required"
        [readonly]="readonly"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-200"
        (input)="onInput($event)"
        (change)="emitChange($event)"
      />
      <p *ngIf="error" class="mt-1 text-sm text-danger">{{ error }}</p>
      <p *ngIf="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
    </div>
  `,
  styles: []
})
export class InputComponent {
  @Input() type: InputType = 'text';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() readonly: boolean = false;
  @Input() error: string = '';
  @Input() hint: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() onChange = new EventEmitter<string>();

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.valueChange.emit(value);
  }

  emitChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.onChange.emit(value);
  }
}
