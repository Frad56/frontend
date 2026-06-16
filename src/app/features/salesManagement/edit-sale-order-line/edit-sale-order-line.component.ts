import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SalesOrderLineService } from '../../../core/services/salesManagement/salesOrderLine/sales-order-line.service';
import { SalesOrderLineDTO } from '../../../shared/models/dto/SalesManegementDTO/SalesOrderLine.dto';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductVariant } from '../../../shared/models/StockManagment/ProductVariant.model';
import { ProductService } from '../../../core/services/stockManagement/productService/product.service';

@Component({
  selector: 'app-edit-sale-order-line',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule],
  templateUrl: './edit-sale-order-line.component.html',
  styleUrl: './edit-sale-order-line.component.css'
})
export class EditSaleOrderLineComponent {


  fb=inject(FormBuilder);

  saleOrderLineForm = this.fb.group({
    productVariantId: [null as number | null],
  
    quantity: [
      null as number | null,
      [Validators.required, Validators.min(1)]
    ],
  
    unitPrice: [
      null as number | null,
      [Validators.required, Validators.min(0.01)]
    ],
  
    discount: [
      null as number | null,
      [ Validators.min(0)]
    ]
  });

  unitPrice!:number;
  private mapFormToSaleOrderLine():SalesOrderLineDTO{
    const formValue = this.saleOrderLineForm.getRawValue();

     this.unitPrice = Number(formValue.unitPrice);
    return {
      productVariantId:this.productVariantId,
      salesOrderId: this.salesOrderId, 
      quantity: Number(formValue.quantity),
      unitPrice: Number(formValue.unitPrice),
      discount: Number(formValue.discount)
    };
  }

  private route = inject(ActivatedRoute);

  private saleOrderLineId!:number;
  private salesOrderLineService = inject(SalesOrderLineService);
  private productService = inject(ProductService);

  productVariantCode!: string;
  productVariantId!: number;
  salesOrderId!: number;
  ngOnInit(){
    this.saleOrderLineId = Number(this.route.snapshot.paramMap.get('id'));
    if(this.saleOrderLineId){
      this.salesOrderLineService.findSalesOrderLineById(this.saleOrderLineId).subscribe({
        next:(salesOrderLine)=>{
          console.log("Sales Order Line :",salesOrderLine);

          if (salesOrderLine.salesOrderId) {
            this.salesOrderId = salesOrderLine.salesOrderId;
          } else {
            console.error("salesOrder absent dans la réponse backend");
          }
          if (salesOrderLine.productVariantId) {
            this.productVariantId = salesOrderLine.productVariantId;
          }
          this.saleOrderLineForm.patchValue({
           // productVariantId:this.productVariantId,
            quantity:salesOrderLine.quantity,
            unitPrice:salesOrderLine.unitPrice,
            discount:salesOrderLine.discount
           
          })
          console.log("Form: productVariantCode :"+this.productVariantCode+", product Variant Id :"+this.productVariantId+", salesOrderId "+  this.salesOrderId)
        },error:(err)=>{
          console.log("error"+err);
        }
      })
    }
  }

  onSubmit(){
    if(this.saleOrderLineForm.invalid) return;
    const SalesOrderLineDTO = this.mapFormToSaleOrderLine();
    this.salesOrderLineService.editSalesOrderLine(SalesOrderLineDTO, this.saleOrderLineId).subscribe({
     next:(resp)=>{
      alert(this.unitPrice )
      console.log("SaleOrderLine edtied successfully ",resp);
      alert("SaleOrderLine edtied successfully ")
      this.saleOrderLineForm.reset();
      this.location.back();
     },error:(err)=>{
      console.log("error :"+err);
     } 
    })
  }

  location = inject(Location);
  goBack() {
    this.location.back();
  }
 
  //edit-sales-Oder-line


}
