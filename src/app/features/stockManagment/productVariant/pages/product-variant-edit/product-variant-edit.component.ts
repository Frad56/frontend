import { Component, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Observable, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../../core/services/stockManagement/productService/product.service';
import { ProductVariantService } from '../../../../../core/services/stockManagement/productVariantService/product-variant.service';
import { Product } from '../../../../../shared/models/StockManagment/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductVariantDTO } from '../../../../../shared/models/dto/stockManagmentDTO/ProductVariant.dto';
import { Location } from '@angular/common';
import { CharacteristicValue } from '../../../../../shared/models/StockManagment/CharacteristicValue.model';
import { CharacteristicValueService } from '../../../../../core/services/stockManagement/CharacteristicValueService/characteristic-value.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-variant-edit',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule],
  templateUrl: './product-variant-edit.component.html',
  styleUrl: './product-variant-edit.component.css'
})
export class ProductVariantEditComponent  implements OnInit{
  private productVariantService = inject(ProductVariantService);
  private productService = inject(ProductService);
  private characteristicsValueService = inject(CharacteristicValueService);
  private formBuilder = inject(FormBuilder);

  protected products$!:Observable<Product[]>;
  private location = inject(Location);


  private route = inject(ActivatedRoute);


  private id!: number;
  productVariantForm= this.formBuilder.group({
    code:[''],
    specificPrice:[''],
    quantityInStock:[''],
    productId:this.formBuilder.control<number | null>(null, Validators.required),
    characteristic:this.formBuilder.group({})
  })


  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("id : ",this.id);
    if(this.id){
      this.productVariantService.findProductVariantById(this.id).subscribe({
        next:(productVariant)=>{
          console.log("productVariant:",productVariant);
          this.productVariantForm.patchValue({
            code:productVariant.code,
            specificPrice:String(productVariant.specificPrice),
            quantityInStock:String( productVariant.quantityInStock),
            productId:productVariant.product.productId,
            
          });
        },
        error:(err)=>{
          console.log("Error loading product",err);
        }
      });
      this.characteristicsValueService.findCharacteristicValueListByProductVariantId(this.id).subscribe({
        next:(characteristicValues)=>{
          console.log("characteristic values",characteristicValues);
          const characteristicGroup = this.productVariantForm.get('characteristic') as FormGroup;
          

            Object.keys(characteristicGroup.controls).forEach(key => {
              characteristicGroup.removeControl(key);
            });
            Object.keys(characteristicValues).forEach(key => {
              characteristicGroup.addControl(
                key,
                this.formBuilder.control(characteristicValues[key])
              );
            });

        },
        error:(err)=>{
          console.log("Error loading characteristic values",err);
        }
      })

    }
  }
  private mapFormToProductVaraint(): ProductVariantDTO {
    const form =this.productVariantForm.getRawValue();
    return {
      code: form.code!,
      specificPrice: Number(form.specificPrice),
      quantityInStock: Number(form.quantityInStock),
      productId: form.productId!,
    } ;
  }
  onSubmit() {
    if (this.productVariantForm.invalid) return;
  
    const productVariantDTO = this.mapFormToProductVaraint();
    const characteristics = this.productVariantForm.get('characteristic')?.value || {};  
    this.productVariantService.editProductVariant(productVariantDTO, this.id).subscribe({
      next: () => {
  
        // 🔥 appel API characteristics
        this.characteristicsValueService.updateCharacteristics(this.id, characteristics).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Edit Product',
              text: 'Product variant updated successfully.',
              confirmButtonColor: '#16a34a'
            });
  
            this.location.back();
          },
          error: (err) => {
            console.error("Error updating characteristics", err);
          }
        });
  
      },
      error: (err) => {
        console.error('Error editing product', err);
  
        if (err.error?.message) {
          alert(err.error.message);
        } else {
          alert('Erreur serveur lors de editing du productVariant');
        }
      }
    });
  }
  goBack(){
    this.location.back();
  }
}
