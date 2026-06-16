import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductVariantService } from '../../../../../core/services/stockManagement/productVariantService/product-variant.service';
import { Observable } from 'rxjs';
import { Product } from '../../../../../shared/models/StockManagment/product.model';
import { ProductService } from '../../../../../core/services/stockManagement/productService/product.service';
import { ProductVariantDTO } from '../../../../../shared/models/dto/stockManagmentDTO/ProductVariant.dto';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductCharacteristicService } from '../../../../../core/services/stockManagement/productCharacteristicService/product-characteristic.service';
import { ProductCharacteristic } from '../../../../../shared/models/StockManagment/ProductCharacteristic.model';
import { MatTableModule } from '@angular/material/table';
import { CharacteristicValue } from '../../../../../shared/models/StockManagment/CharacteristicValue.model';
import { CharacteristicValueService } from '../../../../../core/services/stockManagement/CharacteristicValueService/characteristic-value.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-variant-create',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,MatTableModule,
  FormsModule],
  templateUrl: './product-variant-create.component.html',
  styleUrl: './product-variant-create.component.css'
})
export class ProductVariantCreateComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  private productService = inject(ProductService);
  private productCharacteristicService = inject(ProductCharacteristicService);
  private productVariantService = inject(ProductVariantService);
  private characteristicValueService = inject(CharacteristicValueService);

  product!: Product;
  characteristics$!: Observable<ProductCharacteristic[]>;

  displayedColumns: string[] = ['characteristic','value'];

  productVariantForm = this.fb.group({
   
    specificPrice: [],
    quantityInStock: [],
    productId: [null as number | null, Validators.required],
    values: this.fb.array([])
  });

  get values(): FormArray {
    return this.productVariantForm.get('values') as FormArray;
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) return;


    this.productService.findProductById(id).subscribe(p => {
      this.product = p;

      this.productVariantForm.patchValue({
        productId: p.productId
      });
    });

    this.characteristics$ = this.productCharacteristicService.getProductCharacteristicsByProductId(id);

    this.characteristics$.subscribe(chars => {
      this.values.clear();

      chars.forEach(c => {
        this.values.push(
          this.fb.group({
            characteristicId: [c.characteristic.characteristicId],
            value: ['']
          })
        );
      });
    });
  }

  private mapFormToProductVariant(): ProductVariantDTO {
    return {
      //code: this.productVariantForm.value.code!,
      specificPrice: this.productVariantForm.value.specificPrice!,
      quantityInStock: this.productVariantForm.value.quantityInStock!,
      productId: this.productVariantForm.value.productId!
    }
  }

  onSubmit() {
    if (this.productVariantForm.invalid) return;

    const variantDTO = this.mapFormToProductVariant();
    const valuesForm = this.values.getRawValue();
    this.productVariantService.addProductVariant(variantDTO).subscribe({
      next: (createdVariant) => {


        const valuesDTO = valuesForm.map(v => ({
          characteristicId: v.characteristicId,
          value: v.value,
          productVariantId: createdVariant.productVariantId
        }));

        this.characteristicValueService.saveAllCharacteristicValue(valuesDTO).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Saved Successfully',
              text: 'Your changes have been saved.',
              confirmButtonColor: '#16a34a'
          
            });
            this.goBack();
            this.productVariantForm.reset({
                  productId: this.product.productId
                });

            this.values.clear();
          },error:(err)=>{
              console.error(err)
          }
        });

      },
      error: err => {
        console.error(err);
        alert(err.error.message);
      }
    });
  }

  goBack() {
    this.location.back();
  }

}
