import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AisleService } from '../../../../../core/services/stockManagement/aisleService/aisle.service';
import { AisleDTO } from '../../../../../shared/models/dto/stockManagmentDTO/Aisle.dto';


@Component({
  selector: 'app-aisle-edit',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule],
  templateUrl: './aisle-edit.component.html',
  styleUrl: './aisle-edit.component.css'
})
export class AisleEditComponent implements OnInit {


  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private formBuilder = inject(FormBuilder);
  private aisleService = inject(AisleService);
  id!:number;
  aisleForm = this.formBuilder.group({
    name:['']
  });
  private mapFormToAisle():AisleDTO {
    return this.aisleForm.getRawValue() as unknown as AisleDTO;
  
  }
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("id : ",this.id);
    if(this.id){
      this.aisleService.findAisleById(this.id).subscribe({
        
        next:(aisle)=>{
          console.log("aisle:",aisle);
        
          this.aisleForm.patchValue({
            name:aisle.name
          
          });
        },
        error:(err)=>{
          console.log("Error loading aisle",err);
        }
      });
    }
  }
  onSubmit() {
    if(this.aisleForm.invalid)return;
    
    const aisleDTO = this.mapFormToAisle();
    console.log("#########",this.id);
    this.aisleService.editAisle(aisleDTO,this.id).subscribe({
      next: (response) => {
        alert('Aisle edtied successfully');
        this.location.back();
        console.log('aisle edtied successfully', response);
      },
      error: (err) => {
        console.error('Error edting aisle', err);
      
        if (err.error?.message) {
          alert(err.error.message);   // message Spring
        } else {
          alert('Erreur serveur lors de  editing Aisle');
        }
        console.log("la response ",aisleDTO);
      }
      
    });
  }
  
  goBack(){
    this.location.back();
  }
}
