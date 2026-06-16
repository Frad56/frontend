import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ClientService } from '../../../../core/services/BusinessPartnerManagement/clientManagement/client.service';
import { Client } from '../../../../shared/models/BusinessPartner/ClientManagement/Client.model';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-client',
  standalone: true,
  imports: [CommonModule
    ,MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './list-client.component.html',
  styleUrl: './list-client.component.css'
})
export class ListClientComponent {

  private clientService = inject(ClientService);
  private location = inject(Location);
  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'fax', 'email','address','city','postalCode','country','actions'];

  clients$!  : Observable<Client[]>;
  private router = inject(Router);

  loadCliens(){
    this.clients$ = this.clientService.getClients();

  }
  ngOnInit() {
    this.loadCliens();
  }

  editClient(id:number){
    this.router.navigate(['/admin/client/edit-client',id]);
  }
  
  
  deleteClient(id:number){
    Swal.fire({
      title: "Are you sure you want to delete this Client ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if(result.isConfirmed){
        this.clientService.deleteClient(id).subscribe({
          next:()=>{
            Swal.fire('Deleted!', 'The Client has been deleted.', 'success');
            this.loadCliens();
          },
          error:(error)=>{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.error?.message || 'An error occurred while deleting!'
            });
          }
        });
        
      }
    })     
  }


    addClient(){
      this.router.navigate(['/admin/client/add-client']);
     }
    goBack(){
      this.location.back();
    }

}
