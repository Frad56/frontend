import { Component, OnInit, inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CharacteristicValueService } from '../../../../../core/services/stockManagement/CharacteristicValueService/characteristic-value.service';
import { ProductCharacteristicService } from '../../../../../core/services/stockManagement/productCharacteristicService/product-characteristic.service';
import { ProductVariantService } from '../../../../../core/services/stockManagement/productVariantService/product-variant.service';
import { Observable } from 'rxjs';
import { ProductVariant } from '../../../../../shared/models/StockManagment/ProductVariant.model';
import { ActivatedRoute } from '@angular/router';
import { CharacteristicValueDTO } from '../../../../../shared/models/dto/stockManagmentDTO/CharacteristicValue.dto';
import { Characteristic } from '../../../../../shared/models/StockManagment/Characteristic.model';
import { CharacteristicService } from '../../../../../core/services/stockManagement/characteristicService/characteristic.service';
@Component({
  selector: 'app-characteristic-value-edit',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule],
  templateUrl: './characteristic-value-edit.component.html',
  styleUrl: './characteristic-value-edit.component.css'
})
export class CharacteristicValueEditComponent implements OnInit{
  private formBuilder = inject(FormBuilder);
  private characteristicValueService = inject(CharacteristicValueService);
  private characteristicService = inject(CharacteristicService);
  private productVariantService = inject(ProductVariantService);
  
  private location =inject(Location);
  characteristics$ !: Observable<Characteristic[]>;
  productVariants$ !: Observable<ProductVariant[]>;
  
  private route = inject(ActivatedRoute);
  id!:number;

  characteristicValueForm= this.formBuilder.group({
    productCharacteristicId:[0, Validators.required],
    productVariantId:[0, Validators.required],
    value :['']
  })
  
  ngOnInit(): void {
      this.productVariants$ = this.productVariantService.getProductVariant();
      this.characteristics$ = this.characteristicService.getCharacteristic();
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      if(this.id){
        this.characteristicValueService.findCharacteristicValueById(this.id).subscribe({
        
          next:(characteristicValue)=>{
            console.log("characteristicValue:",characteristicValue);
          
            this.characteristicValueForm.patchValue({
              productCharacteristicId:characteristicValue.characteristic.characteristicId,
              productVariantId:characteristicValue.productVariant.productVariantId,
              value: characteristicValue.value         
            });
          },
          error:(err)=>{
            console.log("Error loading ",err);
          }
        });
      }
    }
  private mapFormToCharacteristicValue():CharacteristicValueDTO{
      return this.characteristicValueForm.getRawValue() as unknown as CharacteristicValueDTO;
  }
      
  onSubmit(){
    if(this.characteristicValueForm.invalid)return;
    const characteristicValueDTO = this.mapFormToCharacteristicValue();
    this.characteristicValueService.editCharacteristicValue(characteristicValueDTO,this.id).subscribe({
      next: (response) => {
        alert('Characteristic Value edtied successfully');
        this.location.back();
      
      },
      error: (err) => {
        console.error('Error edting characteristicValue', err);
      
        if (err.error?.message) {
          alert(err.error.message); 
        } else {
        alert('Erreur serveur lors de  editing du productVariant');
      }
      console.log("la response ",characteristicValueDTO);
    }
    
  });
}

  goBack(){
    this.location.back();
  }
}
