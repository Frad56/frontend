import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ClientService } from '../../../../core/services/BusinessPartnerManagement/clientManagement/client.service';
import { ClientDTO } from '../../../../shared/models/dto/BusinessPartnerDTO/clientManagementDTO/client.dto';
@Component({
  selector: 'app-update-client',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule],
  templateUrl: './update-client.component.html',
  styleUrl: './update-client.component.css'
})
export class UpdateClientComponent {
  
  private location = inject(Location);
  private formBuilder = inject(FormBuilder);
  private clientService = inject(ClientService);
  private route = inject(ActivatedRoute);
  private clientId!:number;
  
  clientForm = this.formBuilder.group({
    firstName:(''),
    lastName:(''),
    fax:(''),
    email:(''),
    address:(''),
    city:(''),
    postalCode:(''),
    country:(''),
  });
  private mapFormToClient():ClientDTO{
    return this.clientForm.getRawValue() as unknown as ClientDTO;
  }

  ngOnInit() {
      this.clientId = Number(this.route.snapshot.paramMap.get('id'));
      if(this.clientId){
        this.clientService.findClientById(this.clientId).subscribe({
          next:(client)=>{
            console.log("client:",client);
            this.clientForm.patchValue({
              firstName:client.firstName,
              lastName:client.lastName,
              fax:client.fax,
              email:client.email,
              address:client.address,
              city:client.city,
              postalCode:client.postalCode,
              country:client.country

            });
          },
          error:(err)=>{
            console.log("Error loading supplier",err);
          }
        });
      }
  }
  

  onSubmit(){
    if(this.clientForm.invalid) return;
    const clientDTO = this.mapFormToClient();
    this.clientService.editClient(clientDTO,this.clientId).subscribe({
      next: (response) => {
        
        alert('Client edtied successfully');
        this.location.back();
        console.log('Client edtied successfully', response);
        this.clientForm.reset();
      },
      error: (err) => {

        console.error('Error edting supplier', err);
        if (err.error?.message) {
          alert(err.error.message);  
        } else {
          alert('Erreur serveur lors de  editing du client');
        }
        console.log("la response ",clientDTO);
      }
    })
  }
  goBack() {
    this.location.back();
  }
 
}
