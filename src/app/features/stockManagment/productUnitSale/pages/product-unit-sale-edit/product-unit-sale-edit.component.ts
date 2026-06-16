import { Component, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ProductUnitSaleService } from '../../../../../core/services/stockManagement/productUnitSaleService/product-unit-sale.service';
import { ProductService } from '../../../../../core/services/stockManagement/productService/product.service';
import { UnitService } from '../../../../../core/services/stockManagement/unitService/unit.service';
import { Observable } from 'rxjs';
import { Product } from '../../../../../shared/models/StockManagment/product.model';
import { Unit } from '../../../../../shared/models/StockManagment/Unit.model';
import { ActivatedRoute } from '@angular/router';
import { ProductUnitSaleDTO } from '../../../../../shared/models/dto/stockManagmentDTO/ProductUnitSale.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-unit-sale-edit',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule],
  templateUrl: './product-unit-sale-edit.component.html',
  styleUrl: './product-unit-sale-edit.component.css'
})
export class ProductUnitSaleEditComponent implements OnInit {
private location = inject(Location);


private productUnitSaleService= inject(ProductUnitSaleService);

private formBuilder = inject(FormBuilder);
private productService = inject(ProductService);
private unitService = inject(UnitService);
private route = inject(ActivatedRoute);

protected products!:Observable<Product[]>;
protected units!:Observable<Unit[]>;
id!:number;

productUnitSaleForm = this.formBuilder.group({
  productVariantId : ['',Validators.required],
  unitPrice :['',Validators.required],
  conversionFactor:['',Validators.required],
  unitId :[null as number | null, Validators.required]

})
ngOnInit(): void {
  this.units = this.unitService.getUnits();
  this.products= this.productService.getProducts();
  this.id = Number(this.route.snapshot.paramMap.get('id'));
  if(this.id){
    this.productUnitSaleService.findProductUnitSaleById(this.id).subscribe({
      next:(productUnitSale) =>{
        this.productUnitSaleForm.patchValue({
          productVariantId: String(productUnitSale.productVariant.productVariantId),
          unitPrice:String(productUnitSale.unitPrice),
          conversionFactor:String(productUnitSale.conversionFactor),
          unitId:productUnitSale.unit.unitId,
        });
      }, error:(err)=>{
        console.log("Error loading product",err);
      }
    });
  }
}
private mapFormToProductUnitSaleForm():ProductUnitSaleDTO {
  return this.productUnitSaleForm.getRawValue() as unknown as ProductUnitSaleDTO;

}
onSubmit(){
  if(this.productUnitSaleForm.invalid)return;
  const productUnitSaleDTO = this.mapFormToProductUnitSaleForm();
  console.log("#########",this.id);
  this.productUnitSaleService.editProductUnitSale(productUnitSaleDTO,this.id).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Product Unit Sale edited successfully.',
        timer: 2000,
        showConfirmButton: false
      });
  
      this.goBack();
    },
    error: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.error?.message || 'An error occurred while updating!'
      });
    }
  })

    
}
  goBack(){
    this.location.back();
  }  
}
