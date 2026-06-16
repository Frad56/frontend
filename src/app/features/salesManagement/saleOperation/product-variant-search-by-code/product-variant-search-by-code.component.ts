import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { ProductVariant } from '../../../../shared/models/StockManagment/ProductVariant.model';
import { ProductVariantService } from '../../../../core/services/stockManagement/productVariantService/product-variant.service';
import { CodeRequest } from '../../../../shared/models/Request/CodeRequest';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

import { Output, EventEmitter } from '@angular/core';
import { CharacteristicValueService } from '../../../../core/services/stockManagement/CharacteristicValueService/characteristic-value.service';



@Component({
  selector: 'app-product-variant-search-by-code',
  standalone: true,
  imports: [CommonModule,
    MatInputModule,
    ReactiveFormsModule],
  templateUrl: './product-variant-search-by-code.component.html',
  styleUrl: './product-variant-search-by-code.component.css'
})
export class ProductVariantSearchByCodeComponent {

  @Output() productSelected = new EventEmitter<ProductVariant>();

  private fb = inject(FormBuilder);

  filteredProducts: ProductVariant[] = [];
  productVariantService = inject(ProductVariantService);
  
  hasTyped = false;
  
  searchProductForm = this.fb.group({
    searchValue: ['', Validators.required]
  });
  
  ngOnInit() {
    this.searchProductForm.get('searchValue')?.valueChanges
      .subscribe((value: string | null) => {
  
        const search = value?.trim() || '';
  
        this.hasTyped = search.length > 0;
  
        if (!this.hasTyped) {
          this.filteredProducts = [];
          return;
        }
  
        this.searchProductVariants(search);
      });
  }
  
  searchProductVariants(codeValue: string) {
    const request_code = {code: codeValue} as CodeRequest;

    this.productVariantService.findProductVariantByCode(request_code).subscribe({
      next: (products) => {
        this.filteredProducts = products;
      
        products.forEach(product => {
      
          this.characteristicsValueService
            .findCharacteristicValueListByProductVariantId(product.productVariantId)
            .subscribe({
      
              next: (characteristics) => {
      
                this.characteristicsMap[product.productVariantId] = characteristics;
      
              },
      
              error: (err) => {
                console.log(err);
              }
      
            });
      
        });
      
      },
      error: () => {
        console.error("Failed operation");
        this.filteredProducts = [];
      }
    });
  }
characteristicsValueService = inject(CharacteristicValueService)

characteristicsMap: { [productId: number]: any } = {};

selectProduct(product: ProductVariant) {
  this.productSelected.emit(product);
  this.characteristicsValueService.findCharacteristicValueListByProductVariantId(product.productVariantId).subscribe({
    next:(characteristics)=>{
      console.log("charcteristic find succ!")
      Object.entries(characteristics).forEach(([key, value]) => {
        console.log(key + " : " + value);
      });
    },
    error:(err)=>{
      console.log("error find Product Characetristics ",err);
    }
  })

}


}
