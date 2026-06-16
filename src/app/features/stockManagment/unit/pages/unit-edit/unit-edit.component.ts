import { Component, OnInit, inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SizeType } from '../../../../../shared/models/enum/SizeType';
import { UnitService } from '../../../../../core/services/stockManagement/unitService/unit.service';
import { UnitDTO } from '../../../../../shared/models/dto/stockManagmentDTO/Unit.dto';
import { ActivatedRoute } from '@angular/router';
import { UnitName } from '../../../../../shared/models/enum/UnitName';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-unit-edit',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule],
  templateUrl: './unit-edit.component.html',
  styleUrl: './unit-edit.component.css'
})
export class UnitEditComponent implements OnInit {

private location = inject(Location);

private formBuilder = inject(FormBuilder);
sizeTypes = Object.values(SizeType).filter(value => isNaN(Number(value))); 
unitNames = Object.values(UnitName).filter(value => isNaN(Number(value))); 
private unitService = inject(UnitService);
private route = inject(ActivatedRoute);

id!:number;

unitForm = this.formBuilder.nonNullable.group({
  unitName: ['',Validators.required],
  unitSymbol: [''],
});
private mapFormToUnit() :UnitDTO{
  return this.unitForm.getRawValue() as unknown as UnitDTO;
}
ngOnInit(): void {
    this.id =  Number(this.route.snapshot.paramMap.get('id'));
    if(this.id){
      this.unitService.findUnitById(this.id).subscribe({
        
        next:(unit)=>{
          console.log("unit:",unit);
        
          this.unitForm.patchValue({
            unitName: String(unit.name),
            unitSymbol: String(unit.symbol),
           
          });
        },
        error:(err)=>{
          console.log("Error loading product",err);
        }
      });
    }
}
onSubmit(){
  if (this.unitForm.invalid) return;
  const unitDTO = this.mapFormToUnit();
  console.log("unitDTO",unitDTO);
  this.unitService.editUnit(unitDTO,this.id).subscribe({
      next:()=>{
        alert("unit edtied successfully");
        Swal.fire('unit edtied successfully');   
        this.location.back();
      },
      error: (err) => {
        console.error('Error edting unit', err);
        console.error('Bakend unit error ', err.error.message);
        console.log("la response ",unitDTO);
      }
  })
}
goBack(){
  this.location.back();
}
}
