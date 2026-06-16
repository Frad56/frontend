import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Location } from '@angular/common';
import { AisleService } from '../../../../../core/services/stockManagement/aisleService/aisle.service';
import { AisleDTO } from '../../../../../shared/models/dto/stockManagmentDTO/Aisle.dto';



@Component({
  selector: 'app-aisle-create',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule],
  templateUrl: './aisle-create.component.html',
  styleUrl: './aisle-create.component.css'
})
export class AisleCreateComponent {


  private location = inject(Location);
  private formBuilder = inject(FormBuilder);
  private aisleService = inject(AisleService);

  aisleFrom = this.formBuilder.group({
    name:['']
  })

  private mapFormToProduct(): AisleDTO {
    return this.aisleFrom.getRawValue() as unknown as AisleDTO;

  }
  onSubmit(){
    if(this.aisleFrom.invalid)return;
    const aisleDTO = this.mapFormToProduct();
    this.aisleService.addAisle(aisleDTO).subscribe({
      next: (response) =>{
        this.aisleFrom.reset();
      },
      error: (err) => {
        console.error('Error creating aisle', err);
      
        if (err.error?.message) {
          alert(err.error.message);   
        
        }
        console.log("la response ",aisleDTO);
      }
    })
   }
  goBack(){
    this.location.back();
  }
}
