import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-devis',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule],
  templateUrl: './create-devis.component.html',
  styleUrl: './create-devis.component.css'
})
export class CreateDevisComponent {

  devisForm: FormGroup;

  // Fake data
  clients = [
    { id: 1, name: 'Ali Ben Ali' },
    { id: 2, name: 'Sonia Trabelsi' }
  ];

  products = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Mouse', price: 50 },
    { id: 3, name: 'Keyboard', price: 100 }
  ];

  constructor(private fb: FormBuilder) {
    this.devisForm = this.fb.group({
      client: ['', Validators.required],
      lines: this.fb.array([])
    });
  }

  get lines(): FormArray {
    return this.devisForm.get('lines') as FormArray;
  }

  addLine() {
    this.lines.push(
      this.fb.group({
        product: ['', Validators.required],
        quantity: [1, Validators.required],
        price: [0, Validators.required]
      })
    );
  }

  removeLine(index: number) {
    this.lines.removeAt(index);
  }

  onProductChange(index: number) {
    const line = this.lines.at(index);
    const productId = line.value.product;

    const product = this.products.find(p => p.id == productId);
    if (product) {
      line.patchValue({ price: product.price });
    }
  }

  calculateTotal(): number {
    return this.lines.controls.reduce((sum, line) => {
      const value = line.value;
      return sum + (value.quantity * value.price);
    }, 0);
  }

  submit() {
    if (this.devisForm.valid) {
      const devis = {
        ...this.devisForm.value,
        total: this.calculateTotal()
      };

      console.log('Devis created:', devis);
      alert('Devis créé avec succès!');
    }
  }
}
