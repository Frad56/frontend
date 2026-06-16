import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'date' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: { value: any; label: string }[];
  error?: string;
}

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="space-y-4">
        <div *ngFor="let field of fields">
          <!-- Text/Email/Password/Number/Date -->
          <div *ngIf="['text', 'email', 'password', 'number', 'date'].includes(field.type)">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ field.label }}
              <span *ngIf="field.required" class="text-danger">*</span>
            </label>
            <input
              [type]="field.type"
              [formControlName]="field.name"
              [placeholder]="field.placeholder || ''"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            />
            <p *ngIf="getFieldError(field.name)" class="mt-1 text-sm text-danger">
              {{ getFieldError(field.name) }}
            </p>
          </div>

          <!-- Textarea -->
          <div *ngIf="field.type === 'textarea'">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ field.label }}
              <span *ngIf="field.required" class="text-danger">*</span>
            </label>
            <textarea
              [formControlName]="field.name"
              [placeholder]="field.placeholder || ''"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              rows="4"
            ></textarea>
            <p *ngIf="getFieldError(field.name)" class="mt-1 text-sm text-danger">
              {{ getFieldError(field.name) }}
            </p>
          </div>

          <!-- Select -->
          <div *ngIf="field.type === 'select'">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ field.label }}
              <span *ngIf="field.required" class="text-danger">*</span>
            </label>
            <select
              [formControlName]="field.name"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            >
              <option value="">-- Select --</option>
              <option *ngFor="let opt of field.options" [value]="opt.value">
                {{ opt.label }}
              </option>
            </select>
            <p *ngIf="getFieldError(field.name)" class="mt-1 text-sm text-danger">
              {{ getFieldError(field.name) }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-3 mt-6">
        <button
          type="button"
          (click)="onCancel()"
          class="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition duration-200 font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          [disabled]="form.invalid || isSubmitting"
          class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 active:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-medium"
        >
          {{ submitLabel }}
        </button>
      </div>
    </form>
  `,
  styles: []
})
export class FormBuilderComponent implements OnInit {
  @Input() fields: FormField[] = [];
  @Input() form!: FormGroup;
  @Input() submitLabel: string = 'Submit';
  @Input() isSubmitting: boolean = false;
  @Output() onFormSubmit = new EventEmitter<any>();
  @Output() onFormCancel = new EventEmitter<void>();

  ngOnInit(): void {
    // Initialization
  }

  getFieldError(fieldName: string): string | null {
    const control = this.form.get(fieldName);
    if (control && control.errors && control.touched) {
      if (control.errors['required']) return `${fieldName} is required`;
      if (control.errors['email']) return 'Invalid email format';
      if (control.errors['minlength']) return `Minimum ${control.errors['minlength'].requiredLength} characters`;
      if (control.errors['maxlength']) return `Maximum ${control.errors['maxlength'].requiredLength} characters`;
      return 'Invalid value';
    }
    return null;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.onFormSubmit.emit(this.form.value);
    }
  }

  onCancel(): void {
    this.onFormCancel.emit();
  }
}
