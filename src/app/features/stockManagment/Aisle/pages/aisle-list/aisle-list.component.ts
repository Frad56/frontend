import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Aisle } from '../../../../../shared/models/StockManagment/Aisle.model';
import { AisleService } from '../../../../../core/services/stockManagement/aisleService/aisle.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-aisle-list',
  standalone: true,
  imports: [CommonModule
    ,MatTableModule,
     MatCardModule,
     MatIconModule,
     MatButtonModule],
  templateUrl: './aisle-list.component.html',
  styleUrl: './aisle-list.component.css'
})
export class AisleListComponent implements OnInit {
  aisles$!: Observable<Aisle[]>;
  displayedColumns: string[] = ['aisleName','actions'];
  private location = inject(Location);
  private aisleService = inject(AisleService);
  private router = inject(Router);

  loadAisle(){
    this.aisles$ = this.aisleService.getAisles();
  }
  ngOnInit() {
      this.loadAisle();
  }

  goBack(){
    this.location.back();
  }
    
  addAisle(){
    this.router.navigate(['admin/aisle/add-aisle']);
  }

  editAisle(id:number){
    this.router.navigate(['admin/aisle/edit-aisle',id]);
  }


  deleteAisle(id:number){
    Swal.fire({
      title: "Are you sure you want to delete this Aisle ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if(result.isConfirmed){
        this.aisleService.deleteAisle(id).subscribe({ 
          next:(response)=>{
            Swal.fire('Deleted!', 'The aisle has been deleted.', 'success');
            this.loadAisle();
          },error:(error)=>{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.error?.message || 'An error occurred while deleting!'
            });
          }
        }
        );

      }
    })     
  }
  
}
