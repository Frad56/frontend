import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Location } from '@angular/common';
import { SizeType } from '../../../../../shared/models/enum/SizeType';
import { UnitService } from '../../../../../core/services/stockManagement/unitService/unit.service';
import { UnitDTO } from '../../../../../shared/models/dto/stockManagmentDTO/Unit.dto';
import { UnitName } from '../../../../../shared/models/enum/UnitName';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-unit-create',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule],
  templateUrl: './unit-create.component.html',
  styleUrl: './unit-create.component.css'
})
export class UnitCreateComponent {
private location = inject(Location);
private formBuilder = inject(FormBuilder);
sizeTypes = Object.values(SizeType).filter(value => isNaN(Number(value))); 
unitNames = Object.values(UnitName).filter(value => isNaN(Number(value))); 
private unitService = inject(UnitService);



unitForm = this.formBuilder.group({
  unitName: ['', Validators.required], 
  unitSymbol: ['', Validators.required],
});

private mapFormToUnit() :UnitDTO{
  return this.unitForm.getRawValue() as unknown as UnitDTO;
}

onSubmit(){
  if(this.unitForm.invalid) return;
  const unitDTO = this.mapFormToUnit();
  this.unitService.addUnit(unitDTO).subscribe({
    next:()=>{
      console.log("unit Created successfully:",unitDTO)
      
      Swal.fire('Unit Created successfully');   
      this.unitForm.reset();
      this.location.back();

    },
    error:(err)=>{
      console.log('error',err)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error?.message || 'An error occurred while creation!'
      });
    }
  })
}
goBack(){
  this.location.back();
}
}
