import { Component, OnInit, inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductUnitSaleService } from '../../../../../core/services/stockManagement/productUnitSaleService/product-unit-sale.service';
import { ProductService } from '../../../../../core/services/stockManagement/productService/product.service';
import { UnitService } from '../../../../../core/services/stockManagement/unitService/unit.service';
import { Product } from '../../../../../shared/models/StockManagment/product.model';
import { Unit } from '../../../../../shared/models/StockManagment/Unit.model';
import { ProductUnitSaleDTO } from '../../../../../shared/models/dto/stockManagmentDTO/ProductUnitSale.dto';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductVariant } from '../../../../../shared/models/StockManagment/ProductVariant.model';
import { ProductVariantService } from '../../../../../core/services/stockManagement/productVariantService/product-variant.service';
@Component({
  selector: 'app-product-unit-sale-create',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule],
  templateUrl: './product-unit-sale-create.component.html',
  styleUrl: './product-unit-sale-create.component.css'
})
export class ProductUnitSaleCreateComponent  implements OnInit{

private productUnitSaleService= inject(ProductUnitSaleService);
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

private mapFormToProductUnitSale():ProductUnitSaleDTO{
  return this.productUnitSaleForm.getRawValue() as unknown as ProductUnitSaleDTO;
}
onSubmit(){
  if(this.productUnitSaleForm.invalid) return;
  const productUnitSaleDTO  = this.mapFormToProductUnitSale();
  this.productUnitSaleService.addProductUnitSale(productUnitSaleDTO).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Created!',
        text: 'Article Unit Created edited successfully.',
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
