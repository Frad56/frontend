import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Location } from '@angular/common';
import { ProductService } from '../../../../../core/services/stockManagement/productService/product.service';
import { CharacteristicService } from '../../../../../core/services/stockManagement/characteristicService/characteristic.service';
import { Observable } from 'rxjs';
import { Product } from '../../../../../shared/models/StockManagment/product.model';
import { Characteristic } from '../../../../../shared/models/StockManagment/Characteristic.model';
import { ProductCharacteristicDTO } from '../../../../../shared/models/dto/stockManagmentDTO/ProductCharacteristic.dto';
import { ProductCharacteristicService } from '../../../../../core/services/stockManagement/productCharacteristicService/product-characteristic.service';
@Component({
  selector: 'app-product-characteristic-create',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule],
  templateUrl: './product-characteristic-create.component.html',
  styleUrl: './product-characteristic-create.component.css'
})
export class ProductCharacteristicCreateComponent  implements OnInit{
private location = inject(Location);
private productService = inject(ProductService);
private characteristicService = inject(CharacteristicService);
private productCharacteristicService = inject(ProductCharacteristicService);

private formBuilder= inject(FormBuilder);
protected products$!:Observable<Product[]>;
protected characteristics$!:Observable<Characteristic[]>;

productCharacteristicForm = this.formBuilder.group({
  productId :['',Validators.required],
  characteristicId:['',Validators.required]
});
private mapFormToProductCharacteristic() :ProductCharacteristicDTO{
  return this.productCharacteristicForm.getRawValue() as unknown as ProductCharacteristicDTO;
}

ngOnInit(): void {
    this.products$ = this.productService.getProducts();
    this.characteristics$ = this.characteristicService.getCharacteristic();
}
onSubmit(){
  if(this.productCharacteristicForm.invalid) return;
  const productCharacteristicDTO = this.mapFormToProductCharacteristic();
  this.productCharacteristicService.addProductCharacteristic(productCharacteristicDTO).subscribe({
    next:(response) => {
      alert('Created successfully');
      this.productCharacteristicForm.reset();
    },
    error :(error)=> {
      console.error('Error :', error,productCharacteristicDTO);

    }
  })
}

goBack(){
  this.location.back();
}
}
