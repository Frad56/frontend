import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ClientService } from '../../../../core/services/BusinessPartnerManagement/clientManagement/client.service';
import { ClientDTO } from '../../../../shared/models/dto/BusinessPartnerDTO/clientManagementDTO/client.dto';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [ ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule],
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.css'
})
export class CreateClientComponent {
  private clientService = inject(ClientService);
  private formBuilder = inject(FormBuilder);
  private location = inject(Location);



  

  clientForm = this.formBuilder.group({
    firstName:[''],
    lastName: [''],
    phoneNumber:[''],
    fax:[''],
    email:['',Validators.email],
    address:[''],
    city:[''],
    postalCode:[''],
    country:['']

  });


private mapFormToClient(): ClientDTO {
  return this.clientForm.getRawValue() as unknown as ClientDTO;
}
  onSubmit() {
    if(this.clientForm.invalid) return;
    const clientDTO = this.mapFormToClient();
    this.clientService.addClient(clientDTO).subscribe({
      next: (response) => {
        alert('Client created successfully');
        console.log('Client created successfully', response);
        this.clientForm.reset();
      },
      error: (err) => {
        console.error('Error creating Client', err);
        if (err.error?.message) {
          alert(err.error.message);   
        } else {
          alert('Erreur serveur lors création client');
        }
        console.log("la response ",clientDTO);
      }
      
    });

  }

  goBack() {
    this.location.back();
  }

  
}
