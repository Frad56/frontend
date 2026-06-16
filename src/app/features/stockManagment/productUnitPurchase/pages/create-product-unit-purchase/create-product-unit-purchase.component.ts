import { Component, OnInit, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductUnitPurchaseDTO } from '../../../../../shared/models/dto/stockManagmentDTO/ProductUnitPurchase.dto';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '../../../../../shared/models/StockManagment/product.model';
import { Unit } from '../../../../../shared/models/StockManagment/Unit.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductVariant } from '../../../../../shared/models/StockManagment/ProductVariant.model';
import { UnitService } from '../../../../../core/services/stockManagement/unitService/unit.service';
import { ProductVariantService } from '../../../../../core/services/stockManagement/productVariantService/product-variant.service';
import { ProductUnitSaleService } from '../../../../../core/services/stockManagement/productUnitSaleService/product-unit-sale.service';
import { CommonModule, Location } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductUnitPurchaseService } from '../../../../../core/services/stockManagement/productUnitPurchase/product-unit-purchase.service';

@Component({
  selector: 'app-create-product-unit-purchase',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule
  ],
  templateUrl: './create-product-unit-purchase.component.html',
  styleUrl: './create-product-unit-purchase.component.css'
})
export class CreateProductUnitPurchaseComponent implements OnInit {

  private productUnitPurchaseService= inject(ProductUnitPurchaseService);
private location = inject(Location);
private formBuilder = inject(FormBuilder);
private productVariantService = inject(ProductVariantService);
private unitService = inject(UnitService);

productVariant!: ProductVariant;

private route = inject(ActivatedRoute);

protected products!:Observable<Product[]>;
protected units!:Observable<Unit[]>;

id!:number;

productUnitSaleForm = this.formBuilder.group({
  productVariantId : [null as number | null, Validators.required],
  unitPrice :['',Validators.required],
  conversionFactor:['',Validators.required],
  unitId :[null as number | null, Validators.required]

})
ngOnInit() {
  const id = Number(this.route.snapshot.paramMap.get('id'));

  
  if (!id) return;

  this.productVariantService.findProductVariantById(id).subscribe(p =>{
    this.productVariant =p;

  this.productUnitSaleForm.patchValue({
    productVariantId:p.productVariantId
    });
  });
  this.units = this.unitService.getUnits();

  this.id = Number(this.route.snapshot.paramMap.get('id'));

  if (this.id) {
    this.productUnitSaleForm.patchValue({
      productVariantId: this.id
    });
  }
}

private mapFormToProductPurchaseSale():ProductUnitPurchaseDTO{
  return this.productUnitSaleForm.getRawValue() as unknown as ProductUnitPurchaseDTO;
}
onSubmit(){
  if(this.productUnitSaleForm.invalid) return;
  const productUnitPurchaseDTO  = this.mapFormToProductPurchaseSale();
  this.productUnitPurchaseService.addProductUnitPurchase(productUnitPurchaseDTO).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Created!',
        text: 'Article Unit Created successfully.',
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

private router =inject(Router);
addUnit(){
  this.router.navigate(['admin/unit/add-unit']);
}

goBack(){
  this.location.back();
}
  

}
