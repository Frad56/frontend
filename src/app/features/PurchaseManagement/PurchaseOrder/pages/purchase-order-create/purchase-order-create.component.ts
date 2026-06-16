import { Component, inject } from '@angular/core';
import { PurchaseOrderService } from '../../../../../core/services/PurchaseManagement/PurchaseOrder/purchase-order.service';
import { CommonModule, Location } from '@angular/common';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { PurchaseOrderDTO } from '../../../../../shared/models/dto/PurchaseManagementDTO/PurchaseOrder.dto';
import { Observable, from } from 'rxjs';
import { Status } from '../../../../../shared/models/enum/status';
import Decimal from 'decimal.js';
import { Supplier } from '../../../../../shared/models/BusinessPartner/SupplierManagement/Suplier.model';
import { PurchaseOrderDTORequest } from '../../../../../shared/models/dto/PurchaseManagementDTO/PurchaseOrderDTORequest.dto';
import { MatSelectModule } from '@angular/material/select';
import { SupplierService } from '../../../../../core/services/BusinessPartnerManagement/supplierManagement/supplier.service';

@Component({
  selector: 'app-purchase-order-create',
  standalone: true,
  imports: [CommonModule, MatSelectModule,ReactiveFormsModule],
  templateUrl: './purchase-order-create.component.html',
  styleUrl: './purchase-order-create.component.css'
})
export class PurchaseOrderCreateComponent {

  private purchaseOrderService =inject(PurchaseOrderService);
  private supplierService = inject(SupplierService);
  private fb = inject(FormBuilder);
  private location = inject(Location);
  protected suppliers$!:Observable<Supplier[]>;

  purchaseOrderForm = this.fb.group({
    supplierId: [, Validators.required],
   // totalAmount: [null as number | null, Validators.required],
  });


  ngOnInit(){
    this.suppliers$ = this.supplierService.getSuppliers();
  }
 
  mapfbToPurchaseOrderDTO():PurchaseOrderDTORequest{
    const form =this.purchaseOrderForm.getRawValue();
    return{
      supplierId: form.supplierId!,
    };
  }

  savePurchaseOrder(){
    
  }

  goBack() {
    this.location.back();
  }
}
