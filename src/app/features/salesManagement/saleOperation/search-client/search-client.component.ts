import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ClientService } from '../../../../core/services/BusinessPartnerManagement/clientManagement/client.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Client } from '../../../../shared/models/BusinessPartner/ClientManagement/Client.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-client',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './search-client.component.html',
  styleUrl: './search-client.component.css'
})
export class SearchClientComponent {

  @Output() clientSelected = new EventEmitter<Client>();

  private clientService = inject(ClientService);


  hasTyped = false;
  fb = inject(FormBuilder);
  searchClientForm= this.fb.group({
    searchValue:['']
  });

  filteredClients: Client [] = [];
  ngOnInit() {
    this.searchClientForm.get('searchValue')?.valueChanges
      .subscribe((value: string | null) => {

        const search = value?.trim() || '';

        this.hasTyped = search.length > 0;

       /* if (!this.hasTyped) {
        ;
          return;
        }*/

        this.searchClientByFirsName(search);
      });
  }

  searchClientByFirsName(name:string){
    this.clientService.findByFirstName(name).subscribe({
      next:(clients)=>{
        this.filteredClients = clients;
        console.log(clients);
       
      },
      error:(error)=>{
        console.error(error);
      }
    })
  }

  selectClient(client:Client){
    this.clientSelected.emit(client);
  }
}
