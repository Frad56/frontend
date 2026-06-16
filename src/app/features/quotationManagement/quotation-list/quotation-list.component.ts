import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Quotation } from '../../../shared/models/quotationManagement/Quotation.dto';
import { Observable } from 'rxjs';
import { QuotationService } from '../../../core/services/quotationManagement/quotationService/quotation.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-quotation-list',
  standalone: true,
  imports: [CommonModule
    ,MatTableModule,
     MatCardModule,
     MatIconModule,
     MatButtonModule],
  templateUrl: './quotation-list.component.html',
  styleUrl: './quotation-list.component.css'
})
export class QuotationListComponent {
  quotation$!: Observable<Quotation[]>;
  displayedColumns: string[] = ['quotationDate','totalAmount','clientInfo','clientNumber','actions'];
  private location = inject(Location);
  private quotationService = inject(QuotationService);
  private router = inject(Router);
  addQuotation(){
    this.router.navigate(['admin/quotation/add']);
  }

  loadQuotation(){
    this.quotation$ =this.quotationService.getQuotations();
  }
  ngOnInit(){
    this.loadQuotation();
  }

  goBack(){
    this.location.back();
  }
    
  editQuotation(id :number){
   // alert("id"+id)
    this.router.navigate(['admin/quotation/line-list',id]);

  }
  deleteQuotation(id :number){
    Swal.fire({
      title: "Are you sure you want to delete this Quotation ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if(result.isConfirmed){
        this.quotationService.deleteQuotation(id).subscribe({
          next:()=>{
            Swal.fire('Deleted!', 'The Quotation has been deleted.', 'success');
            this.loadQuotation();
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
}
