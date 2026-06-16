import { Component, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../../../../../core/services/stockManagement/productService/product.service';
import {  MatInputModule } from '@angular/material/input';
import { Supplier } from '../../../../../../shared/models/BusinessPartner/SupplierManagement/Suplier.model';
import { Product } from '../../../../../../shared/models/StockManagment/product.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductSupplierDTO } from '../../../../../../shared/models/dto/BusinessPartnerDTO/supplierManagementDTO/productSupplier.dto';
import { Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SupplierService } from '../../../../../../core/services/BusinessPartnerManagement/supplierManagement/supplier.service';
import { ProductSupplierService } from '../../../../../../core/services/BusinessPartnerManagement/supplierManagement/product-supplier.service';

@Component({
  selector: 'app-create-product-supplier',
  standalone: true,
  imports: [ReactiveFormsModule,
     MatFormFieldModule, 
     MatSelectModule, 
     MatInputModule,
     MatButtonModule,
    CommonModule,
    MatCardModule],
  templateUrl: './create-product-supplier.component.html',
  styleUrl: './create-product-supplier.component.css'
})
export class CreateProductSupplierComponent implements OnInit {



suppliers!: Observable<Supplier[]>;
products!:Observable<Product[]>;
private productService = inject(ProductService);
private supplierService = inject(SupplierService);

private productSupplierService = inject(ProductSupplierService);
private formBuilder = inject(FormBuilder);
private location = inject(Location);

form =this.formBuilder.group({
      productId: [''],
      supplierId: [''],
      purchasePrice: [''],
      })
ngOnInit(){

 
this.products= this.productService.getProducts()
this.suppliers = this.supplierService.getSuppliers()
}

private mapFormToProductSupplier() : ProductSupplierDTO {
  return this.form.getRawValue() as unknown as ProductSupplierDTO;

}
OnSubmit(){
  if(this.form.invalid) return;
  const productSupplierDTO = this.mapFormToProductSupplier();
  this.productSupplierService.addProductSupplier(productSupplierDTO).subscribe({
    next: (response) => {
      console.log('Product Supplier created successfully', response);
      this.form.reset();
    },
    error: (err) => {
      console.error('Error creating Product Supplier', err);
      if (err.error?.message) {
        alert(err.error.message);  
      } else {
        alert('Erreur serveur lors création Product Supplier');
      }
      console.log("la response ",productSupplierDTO);
    }
  })
}


goBack() {
  this.location.back();
}
}
