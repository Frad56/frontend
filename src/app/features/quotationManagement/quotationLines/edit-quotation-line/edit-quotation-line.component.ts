import { CommonModule ,Location} from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { QuotationLineServiceService } from '../../../../core/services/quotationManagement/quotationLineService/quotation-line-service.service';
import { QuotationLine } from '../../../../shared/models/quotationManagement/QuotationLine.dto';

@Component({
  selector: 'app-edit-quotation-line',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule],
  templateUrl: './edit-quotation-line.component.html',
  styleUrl: './edit-quotation-line.component.css'
})
export class EditQuotationLineComponent {
  private route = inject(ActivatedRoute);
  private quotationLineService = inject(QuotationLineServiceService)
  private quotationLineId!:number;

  fb=inject(FormBuilder);

  quotationLineForm = this.fb.group({
    productVariantId: [null as number | null],
    quantity: [null as number | null, [Validators.required, Validators.min(1)]],
    unitPrice: [null as number | null, [Validators.required, Validators.min(0.01)]],
    discount: [null as number | null, [Validators.min(0)]]
  });

  private mapFormToQuotationLine():QuotationLine{
    const formValue = this.quotationLineForm.getRawValue();

    return {
      quotationId: this.quotationId, 
      quotationLineId:this.quotationLineId,
      quantity: Number(formValue.quantity),
      productVariantId: formValue.productVariantId ?? undefined,
      unitPrice: Number(formValue.unitPrice),
      discount: Number(formValue.discount)
    };
  }

  private quotationId!: number;
  ngOnInit(){
    this.quotationLineId = Number(this.route.snapshot.paramMap.get('id'));
    if( this.quotationLineId){
      this.quotationLineService.findQuotatioLinesById(this.quotationLineId).subscribe({
        next:(quotationLine)=>{
          this.quotationId = quotationLine.quotationId!; 
          console.log("Find Quotation line",quotationLine);
            this.quotationLineForm.patchValue({
              
              quantity:quotationLine.quantity,
              productVariantId:quotationLine.productVariantId,
              unitPrice:quotationLine.unitPrice,
              discount:quotationLine.discount
            })
           // console.log("Form: productVariantCode :"+this.productVariantCode+", product Variant Id :"+this.productVariantId+", salesOrderId "+  this.salesOrderId)
        },error:(err)=>{
          console.log("error"+err);
        }

      })
    }

  }
  location = inject(Location);
  onSubmit(){
    if(this.quotationLineForm.invalid)return;
    const quotationLineDTO = this.mapFormToQuotationLine();
    alert("id "+this.quotationLineId)
    this.quotationLineService.editQuotationLine(quotationLineDTO,this.quotationLineId).subscribe({
      next:(resp)=>{
        console.log("QuotationLine edtied successfully ",resp);
        alert("QuotationLine edtied successfully ")
        this.quotationLineForm.reset();
        this.goBack();
       },error:(err)=>{
        console.log("error :"+err);
       } 
    })
  }


  goBack() {
    this.location.back();
  }
 
}
