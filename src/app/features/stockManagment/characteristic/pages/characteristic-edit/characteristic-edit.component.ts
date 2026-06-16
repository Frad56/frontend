import { Component, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CharacteristicService } from '../../../../../core/services/stockManagement/characteristicService/characteristic.service';
import { ActivatedRoute } from '@angular/router';
import { CharacteristicTypeValue } from '../../../../../shared/models/enum/Characteristic-type-value';
import { CharacteristicDTO } from '../../../../../shared/models/dto/stockManagmentDTO/Characteristic.dto';
@Component({
  selector: 'app-characteristic-edit',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule],
  templateUrl: './characteristic-edit.component.html',
  styleUrl: './characteristic-edit.component.css'
})
export class CharacteristicEditComponent implements OnInit{


characteristicTypeValues = Object.values(CharacteristicTypeValue); 
private location = inject(Location);
private route = inject(ActivatedRoute);
private characteristicService = inject(CharacteristicService);
private formBuilder= inject(FormBuilder);

id!:number;
characteristicForm = this.formBuilder.group({
  name:[''],
  type:['',Validators.required]
})
private mapFormToCharacteristic():CharacteristicDTO{
  return this.characteristicForm.getRawValue() as unknown as CharacteristicDTO;
}
ngOnInit(): void {
  this.id = Number(this.route.snapshot.paramMap.get('id'));
  if(this.id){
    this.characteristicService.findCharacteristicById(this.id).subscribe({
      
      next:(characteristic)=>{
        console.log("characteristic:",characteristic);
      
        this.characteristicForm.patchValue({
          name:characteristic.name,
          type:characteristic.type,
        
        });
      },
      error:(err)=>{
        console.log("Error loading product",err);
      }
    });
  }
}
onSubmit(){
  if (this.characteristicForm.invalid) return;
  const characteristicDTO = this.mapFormToCharacteristic();
  console.log("characteristicDTO",characteristicDTO);
  this.characteristicService.editCharacteristic(characteristicDTO,this.id).subscribe({
      next:()=>{
        alert("Characteristic edtied successfully");
        this.location.back();
      },
      error: (err) => {
        console.error('Error edting characteristic', err);
      
        console.log("la response ",characteristicDTO);
      }
  })
    
  
}
goBack(){
  this.location.back();
}
}
