import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SupplierDTO } from '../../../../../../shared/models/dto/BusinessPartnerDTO/supplierManagementDTO/supplier.dto';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../../../shared/models/StockManagment/product.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { Location } from '@angular/common';
import { SupplierService } from '../../../../../../core/services/BusinessPartnerManagement/supplierManagement/supplier.service';

@Component({
  selector: 'app-create-supplier',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.css']
})
export class CreateSupplierComponent {

  private supplierService = inject(SupplierService);
  private formBuilder = inject(FormBuilder);
  private location = inject(Location);


  products: Product[] = [];
  

  supplierForm = this.formBuilder.group({
    companyName:[''],
    contactName: [''],
    phoneNumber:[''],
    fax:[''],
    email:['',Validators.email],
    address:[''],
    city:[''],
    postalCode:[''],
    country:[''],
    taxIdentificationNumber:[''],

  });


private mapFormToSupplier(): SupplierDTO {
  return this.supplierForm.getRawValue() as unknown as SupplierDTO;
}
  onSubmit() {
    if(this.supplierForm.invalid) return;
    const supplierDTO = this.mapFormToSupplier();
    this.supplierService.addSupplier(supplierDTO).subscribe({
      next: (response) => {
        alert('Supplier created successfully');
        console.log('Supplier created successfully', response);
        this.supplierForm.reset();
      },
      error: (err) => {
        console.error('Error creating supplier', err);
        if (err.error?.message) {
          alert(err.error.message);   
        } else {
          alert('Erreur serveur lors création   supplier');
        }
        console.log("la response ",supplierDTO);
      }
      
    });

  }

  goBack() {
    this.location.back();
  }

  

}

