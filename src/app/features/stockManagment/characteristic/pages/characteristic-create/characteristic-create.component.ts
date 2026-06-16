import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CharacteristicService } from '../../../../../core/services/stockManagement/characteristicService/characteristic.service';
import { Location } from '@angular/common';
import { CharacteristicTypeValue } from '../../../../../shared/models/enum/Characteristic-type-value';
import { CharacteristicDTO } from '../../../../../shared/models/dto/stockManagmentDTO/Characteristic.dto';
import { ActivatedRoute } from '@angular/router';
import { ProductCharacteristic } from '../../../../../shared/models/StockManagment/ProductCharacteristic.model';
import { ProductCharacteristicService } from '../../../../../core/services/stockManagement/productCharacteristicService/product-characteristic.service';
import { ProductCharacteristicDTO } from '../../../../../shared/models/dto/stockManagmentDTO/ProductCharacteristic.dto';

@Component({
  selector: 'app-characteristic-create',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule],
  templateUrl: './characteristic-create.component.html',
  styleUrl: './characteristic-create.component.css'
})
export class CharacteristicCreateComponent {

  productId!:number;
  characteristicId!:number;
  private route = inject(ActivatedRoute);

  characteristicTypeValues = Object.values(CharacteristicTypeValue); 
  private formBuilder = inject(FormBuilder);
  private characteristicService = inject(CharacteristicService);
  private location = inject(Location);

  private productCharacteristicService = inject(ProductCharacteristicService);

  characteristicForm = this.formBuilder.group({
    name:[''],
    type:['',Validators.required]
  })
  

  private mapFormToCharacteristic():CharacteristicDTO{
    return this.characteristicForm.getRawValue() as unknown as CharacteristicDTO;
  }
  
  onSubmit(){
    if(this.characteristicForm.invalid) return;

    const characteristicDTO = this.mapFormToCharacteristic();
    this.characteristicService.addCharacteristic(characteristicDTO).subscribe({
      next:(response) =>{
        console.log("data:",characteristicDTO);
        //this.characteristicId = response.characteristicId;
        //console.log("Characteristic ID:", this.characteristicId);
        //const productCharacteristicDTO = this.mapFormToProductCharacteristic();
        /*this.characteristicService.addCharacteristic(productCharacteristicDTO).subscribe({
          next:(response)=>{
            console.log("********************")
            console.log("ProductCharacteristic added!")
            console.log("********************")
            alert("greate")
          },
          error:(err)=>{
            console.log('error createing ProductCharacteristic',err)
          }
        }); */
        this.characteristicForm.reset();
      },
      error:(err)=>{
        if (err.error?.message) {
          alert(err.error.message);  
        }
        console.log('error',err)
      }
    })
  }
  
 /* private mapFormToProductCharacteristic(): ProductCharacteristicDTO {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    return {
      productId: this.productId,
      characteristicId: this.characteristicId,
    };
  }
  */
 


  goBack(){
    this.location.back();
  }
}
