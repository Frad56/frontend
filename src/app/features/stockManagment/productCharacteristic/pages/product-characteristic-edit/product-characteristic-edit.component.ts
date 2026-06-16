import { Component, Inject, Injector, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductCharacteristicService } from '../../../../../core/services/stockManagement/productCharacteristicService/product-characteristic.service';
import { ProductCharacteristicDTO } from '../../../../../shared/models/dto/stockManagmentDTO/ProductCharacteristic.dto';
import { Observable } from 'rxjs';
import { Product } from '../../../../../shared/models/StockManagment/product.model';
import { Characteristic } from '../../../../../shared/models/StockManagment/Characteristic.model';
import { ProductService } from '../../../../../core/services/stockManagement/productService/product.service';
import { CharacteristicService } from '../../../../../core/services/stockManagement/characteristicService/characteristic.service';

@Component({
  selector: 'app-product-characteristic-edit',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule],
  templateUrl: './product-characteristic-edit.component.html',
  styleUrl: './product-characteristic-edit.component.css'
})
export class ProductCharacteristicEditComponent implements OnInit {
private location = inject (Location);
private formBuilder = inject(FormBuilder);
private productCharacteristicService = inject(ProductCharacteristicService);
private route = inject(ActivatedRoute);
protected products$!:Observable<Product[]>;
protected characteristics$!:Observable<Characteristic[]>;
id!:number; 

private characteristicService = inject(CharacteristicService);
private productService = inject(ProductService);

productCharacteristicForm = this.formBuilder.group({
  productId :[null as number | null, Validators.required],
  characteristicId:[null as number | null, Validators.required]
});

ngOnInit(): void {
  this.products$ = this.productService.getProducts();
  this.characteristics$ = this.characteristicService.getCharacteristic();

  this.id = Number(this.route.snapshot.paramMap.get('id'));
  console.log("id : ",this.id);
  if(this.id){
    this.productCharacteristicService.findProductCharacteristicById(this.id).subscribe({
      next:(productCharacteristic)=>{
        console.log("product Characteristic :",productCharacteristic);
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        this.productCharacteristicForm.patchValue({
          productId:productCharacteristic.product.productId,
          characteristicId:productCharacteristic.characteristic.characteristicId
        
        });
        console.log(this.productCharacteristicForm.value);
      },
      error:(err)=>{
        console.log("Error loading ",err);
      }
    });
  }
}
private mapFormToProductCharacteristic() :ProductCharacteristicDTO{
  return this.productCharacteristicForm.getRawValue() as unknown as ProductCharacteristicDTO;
}
onSubmit(){
  if(this.productCharacteristicForm.invalid) return;
  const productCharacteristicDTO = this.mapFormToProductCharacteristic();
  this.productCharacteristicService.editProductCharacteristic(productCharacteristicDTO,this.id).subscribe({
    next:(response) =>{
      alert('Product Characteristic Edtied successfully');
      this.location.back();
    },
    error:(err) =>{
      console.error('Error edting! ', err);

    }
  })
}
goBack(){
  this.location.back();
}
}
