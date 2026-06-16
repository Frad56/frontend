import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CharacteristicValueService } from '../../../../../core/services/stockManagement/CharacteristicValueService/characteristic-value.service';
import { ProductCharacteristicService } from '../../../../../core/services/stockManagement/productCharacteristicService/product-characteristic.service';
import { CharacteristicValueDTO } from '../../../../../shared/models/dto/stockManagmentDTO/CharacteristicValue.dto';
import { Observable } from 'rxjs';
import { ProductCharacteristic } from '../../../../../shared/models/StockManagment/ProductCharacteristic.model';
import { ProductVariant } from '../../../../../shared/models/StockManagment/ProductVariant.model';
import { ProductVariantService } from '../../../../../core/services/stockManagement/productVariantService/product-variant.service';
import { Location } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
@Component({
  selector: 'app-characteristic-value-create',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    MatCheckboxModule],
  templateUrl: './characteristic-value-create.component.html',
  styleUrl: './characteristic-value-create.component.css'
})
export class CharacteristicValueCreateComponent implements OnInit {

private formBuilder = inject(FormBuilder);
private characteristicValueService = inject(CharacteristicValueService);
private productCharacteristicService = inject(ProductCharacteristicService);
private productVariantService = inject(ProductVariantService);

private location =inject(Location);
productCharacteristics$ !: Observable<ProductCharacteristic[]>;
productVariants$ !: Observable<ProductVariant[]>;

characteristicValueForm= this.formBuilder.group({
  productCharacteristicId:[0, Validators.required],
  productVariantId:[0, Validators.required],
  value :['']
})

ngOnInit(): void {
    this.productVariants$ = this.productVariantService.getProductVariant();
    this.productCharacteristics$ = this.productCharacteristicService.getProductCharacteristic();

}
private mapFormToCharacteristicValue():CharacteristicValueDTO{
  return this.characteristicValueForm.getRawValue() as unknown as CharacteristicValueDTO;
}

onSubmit(){
  if(this.characteristicValueForm.invalid) return;
  const characteristicValueDTO = this.mapFormToCharacteristicValue();
  this.characteristicValueService.addCharacteristicValue(characteristicValueDTO).subscribe({
    next: (response) => {
      console.log('characteristicValue Created successfully', response);
      alert('characteristicValue Created successfully');
      this.characteristicValueForm.reset();
    },
    error: (err) => {
      console.error('Error creating', err);
    
      if (err.error?.message) {
        alert(err.error.message);   // message Spring
      } else {
        alert('Erreur serveur lors création ');
      }
      console.log("la response ",characteristicValueDTO);
    }
  })

}
goBack(){
  this.location.back();
}
  


}
