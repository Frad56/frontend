import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../../core/services/stockManagement/productService/product.service';
import { ProductDTO } from '../../../../../shared/models/dto/stockManagmentDTO/product.dto';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { Category } from '../../../../../shared/models/StockManagment/Category.model';
import { CategoryService } from '../../../../../core/services/stockManagement/categoryService/category.service';
import { Location } from '@angular/common';
import { Product } from '../../../../../shared/models/StockManagment/product.model';
import { ActivatedRoute } from '@angular/router';
import { Aisle } from '../../../../../shared/models/StockManagment/Aisle.model';
import { AisleService } from '../../../../../core/services/stockManagement/aisleService/aisle.service';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {

aisles!:Observable<Aisle[]>;
categorys!:Observable<Category[]>;  
product!:Observable<Product>;
id!:number;

private productService = inject(ProductService);
private categoryService = inject(CategoryService);
private aisleService = inject(AisleService);
private formBuilder = inject(FormBuilder);
private location = inject(Location);
private route = inject(ActivatedRoute);

productForm = this.formBuilder.group({
  reference :[''],
  designation:[''],
  brand:[''],
  description:[''],
  basePrice: [''],
  categoryId: this.formBuilder.control<number | null>(null, Validators.required),
  aisleId:this.formBuilder.control<number | null>(null, Validators.required)
  });


ngOnInit(){
    this.categorys = this.categoryService.leafCategoryList();
    this.aisles =this.aisleService.getAisles();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("id : ",this.id);
    if(this.id){
      this.productService.findProductById(this.id).subscribe({
        
        next:(product)=>{
          console.log("product:",product);
        
          this.productForm.patchValue({
            reference:product.reference,
            designation:product.designation,
            brand: product.brand,
            description: product.description,
            basePrice:String(product.basePrice),
            categoryId:product.category?.categoryId,
            aisleId:product.aisle?.aisleId
        
          });
        },
        error:(err)=>{
          console.log("Error loading product",err);
        }
      });
    }
  }  
private mapFormToProduct():ProductDTO {
  return this.productForm.getRawValue() as unknown as ProductDTO;

}

onSubmit() {
  if(this.productForm.invalid) {
  this.productForm.markAllAsTouched()
  return;
  }
  const productDTO = this.mapFormToProduct();
  console.log("#########",this.id);
  this.productService.editProduct(productDTO,this.id).subscribe({
    next: (response) => {
      alert('Product edtied successfully');
      this.location.back();
      //console.log('Product edtied successfully', response);
      //this.productForm.reset();
    },
    error: (err) => {
      console.error('Error edting product', err);
    
      if (err.error?.message) {
        alert(err.error.message); 
      } else {
        alert('Erreur serveur lors de  editing du produit');
      }
      console.log("la response ",productDTO);
    }
    
  });
}

goBack(){
  this.location.back();
}
}
