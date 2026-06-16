import { CommonModule, KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { QuotationLine } from '../../../../shared/models/quotationManagement/QuotationLine.dto';
import { QuotationLineServiceService } from '../../../../core/services/quotationManagement/quotationLineService/quotation-line-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quotation-lines',
  standalone: true,
  imports: [CommonModule
    ,MatTableModule,
     MatCardModule,
     MatIconModule,
     MatButtonModule,
    KeyValuePipe],
  templateUrl: './quotation-lines.component.html',
  styleUrl: './quotation-lines.component.css'
})
export class QuotationLinesComponent {

  private location = inject(Location);

  quotationLines$!:Observable<QuotationLine[]>;
  displayedColumns: string[] = ['productVariantCode','characteristicValue','unitPrice','discount','quotationLineTotal','actions'];
  private quotationLineService = inject(QuotationLineServiceService)
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id!:number;
  loadQuotationLines(id:number){
    this.quotationLines$ = this.quotationLineService.findQuotatioLinesByQuotationId(id);
  }
  ngOnInit(){
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadQuotationLines(this.id);
  }
 
  deleteQuotationLine(id:number){
    Swal.fire({
      title: "Are you sure you want to delete this Quotation ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if(result.isConfirmed){
        this.quotationLineService.deleteQuotationLine(id).subscribe({
          next:()=>{
            Swal.fire('Deleted!', 'The Quotation Line has been deleted.', 'success');
            this.loadQuotationLines(this.id);
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


  goBack(){
    this.location.back();
  }
    


  addQuotationLine(){}
  editQuotationLine(id:number){
    this.router.navigate(['/admin/quotation/edit-line',id]);
  }
}
