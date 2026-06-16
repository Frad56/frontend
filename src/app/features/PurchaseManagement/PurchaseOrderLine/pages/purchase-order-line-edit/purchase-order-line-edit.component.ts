import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PurchaseOrderLineService } from '../../../../../core/services/PurchaseManagement/PurchaseOrderLine/purchase-order-line.service';
import { UnitService } from '../../../../../core/services/stockManagement/unitService/unit.service';
import { Observable } from 'rxjs';
import { Unit } from '../../../../../shared/models/StockManagment/Unit.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule ,Location} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PurchaseOrderLine } from '../../../../../shared/models/PurchaseManagement/PurchaseOrderLine.model';
import { PurchaseOrderLineDTO } from '../../../../../shared/models/dto/PurchaseManagementDTO/PurchaseOrderLine.dto';
import { PurchaseOrderService } from '../../../../../core/services/PurchaseManagement/PurchaseOrder/purchase-order.service';
import { ProductUnitPurchase } from '../../../../../shared/models/StockManagment/ProductUnitPurchase.model';
import { ProductUnitPurchaseService } from '../../../../../core/services/stockManagement/productUnitPurchase/product-unit-purchase.service';

@Component({
  selector: 'app-purchase-order-line-edit',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule],
  templateUrl: './purchase-order-line-edit.component.html',
  styleUrl: './purchase-order-line-edit.component.css'
})
export class PurchaseOrderLineEditComponent {




  id!:number;
  purchaseOrderLine!: PurchaseOrderLine;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  purchaseOrderLineService = inject(PurchaseOrderLineService);
  purchaseOrderService = inject(PurchaseOrderService);
  unitService = inject(ProductUnitPurchaseService);
  private location = inject(Location);

  protected unitList$!:Observable<ProductUnitPurchase[]>;
  


  purchaseOrderLineForm = this.fb.group({
      purchaseOrderId: [null as number | null, Validators.required],
      productVariantId: [null as number | null, Validators.required],
      productUnitPurchaseId: [null as number | null],
      quantity: [null as number | null, Validators.required],
      discount: [null as string | null],
      unitPriceHt: [null as number | null],
      unitPriceTTC: [null as number | null],
      totalHT: [null as number | null],
      totalTTC: [null as number | null],
      tax: [null as number | null, Validators.required],
      total: [null as number | null]
  });
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("id : ",this.id);
    if(this.id){
      this.purchaseOrderLineService.findPurchaseOrderLineById(this.id).subscribe({

        next:(purchaseOrderLine)=>{
          this.purchaseOrderLine = purchaseOrderLine; 
          
          this.unitList$=this.unitService.findProductUnitPurchaseByProductVariantId(purchaseOrderLine.productVariant.productVariantId);

          console.log("purchaseOrderLine:",purchaseOrderLine);
          this.purchaseOrderLineForm.patchValue({
            purchaseOrderId: purchaseOrderLine.purchaseOrder.purchaseOrderId,
            productVariantId: purchaseOrderLine.productVariant.productVariantId,
            productUnitPurchaseId: purchaseOrderLine.productUnitPurchase?.productUnitPurchaseId ?? null,
            quantity: purchaseOrderLine.quantity,
            discount: purchaseOrderLine.discount,
            unitPriceHt: null,
            unitPriceTTC: purchaseOrderLine.unitPriceTTC,
            totalHT: null,
            totalTTC: null,
            tax: purchaseOrderLine.tax,
            total: null
          });

      
      },error:(err)=>{
          console.log("Error fetching purchase order line:", err);  
      }
    
    });
    }
  }
  private mapFormToPurchaseOrderLine():PurchaseOrderLineDTO {
    return this.purchaseOrderLineForm.getRawValue() as unknown as PurchaseOrderLineDTO;
  
  }
  onSubmit(){
    alert("submit");
    if(this.purchaseOrderLineForm.invalid){
      
      this.purchaseOrderLineForm.markAllAsTouched();
      return;
    }
    const purchaseOrderLineDTO = this.mapFormToPurchaseOrderLine();
    this.purchaseOrderLineService.editPurchaseOrderLine(purchaseOrderLineDTO,this.id).subscribe({
      next:(response)=>{
        console.log("Purchase order line updated successfully:", response);
        this.purchaseOrderLineService.totalOfPurchaseOrder(purchaseOrderLineDTO.purchaseOrderId).subscribe({
          next:(res)=>{
            console.log("Total of purchase order updated successfully:", res);
          },
          error:(err)=>{
            console.log("Error updating total of purchase order:", err);
          }
        });
        this.goBack();
      },
      error:(err)=>{
        console.log("Error updating purchase order line:", err);
      }
    });
  }
  goBack() {
    this.location.back();
  }

}
