import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Location } from '@angular/common';
import { SupplierDTO } from '../../../../../../shared/models/dto/BusinessPartnerDTO/supplierManagementDTO/supplier.dto';
import { Observable } from 'rxjs';
import { Supplier } from '../../../../../../shared/models/BusinessPartner/SupplierManagement/Suplier.model';
import { ActivatedRoute } from '@angular/router';
import { SupplierService } from '../../../../../../core/services/BusinessPartnerManagement/supplierManagement/supplier.service';
@Component({
  selector: 'app-update-supplier',
  standalone: true,
  imports: [ ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule],
  templateUrl: './update-supplier.component.html',
  styleUrl: './update-supplier.component.css'
})
export class UpdateSupplierComponent  implements OnInit{

  private location = inject(Location);
  private formBuilder = inject(FormBuilder);
  private supplierService = inject(SupplierService);
  private route = inject(ActivatedRoute);
  private supplierId!:number;
  
  supplierForm = this.formBuilder.group({
    companyName:(''),
    contactName:(''),
    phoneNumber:(''),
    fax:(''),
    email:(''),
    address:(''),
    city:(''),
    postalCode:(''),
    country:(''),
    taxIdentificationNumber:(''),
  });
  private mapFormToSupplier():SupplierDTO{
    return this.supplierForm.getRawValue() as unknown as SupplierDTO;
  }

  ngOnInit() {
      this.supplierId = Number(this.route.snapshot.paramMap.get('id'));
      if(this.supplierId){
        this.supplierService.findSuppliertById(this.supplierId).subscribe({
          next:(supplier)=>{
            console.log("supplier:",supplier);
            this.supplierForm.patchValue({
              companyName:supplier.companyName,
              contactName:supplier.contactName,
              phoneNumber:supplier.phoneNumber,
              fax:supplier.fax,
              email:supplier.email,
              address:supplier.address,
              city:supplier.city,
              postalCode:supplier.postalCode,
              country:supplier.country,
              taxIdentificationNumber:supplier.taxIdentificationNumber

            });
          },
          error:(err)=>{
            console.log("Error loading supplier",err);
          }
        });
      }
  }
  

  onSubmit(){
    if(this.supplierForm.invalid) return;
    const supplierDTO = this.mapFormToSupplier();
    this.supplierService.editSupplier(supplierDTO,this.supplierId).subscribe({
      next: (response) => {
        alert('Supplier edtied successfully');
        this.location.back();
        console.log('Supplier edtied successfully', response);
        this.supplierForm.reset();
      },
      error: (err) => {
        console.error('Error edting supplier', err);
      
        if (err.error?.message) {
          alert(err.error.message);  
        } else {
          alert('Erreur serveur lors de  editing supplier');
        }
        console.log("la response ",supplierDTO);
      }
    })
  }
  goBack() {
    this.location.back();
  }
}
