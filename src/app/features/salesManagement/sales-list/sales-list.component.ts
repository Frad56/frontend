import { Component, inject } from '@angular/core';
import { SalesOrderService } from '../../../core/services/salesManagement/salesOrder/sales-order.service';
import { Observable } from 'rxjs';
import { SalesOrder } from '../../../shared/models/salesManagement/SalesOrder.model';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

import Swal from 'sweetalert2';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SalesOrderDTO } from '../../../shared/models/dto/SalesManegementDTO/SalesOrder.dto';

@Component({
  selector: 'app-sales-list',
  standalone: true,
  imports: [CommonModule
    ,MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './sales-list.component.html',
  styleUrl: './sales-list.component.css'
})
export class SalesListComponent {

  private saleService = inject(SalesOrderService);
  displayedColumns: string[] = [  'salesOrderDate', 'totalAmount','clientName','actions'];
  saleOrdersList$!:Observable<SalesOrderDTO[]>;
  private router = inject(Router);

  loadSaleOrder(){
    this.saleOrdersList$= this.saleService.getSalesOrders();
  }
  ngOnInit(){
    this.loadSaleOrder();
  }
  editSaleOrder(id:number){
    this.router.navigate(['/admin/sale/edit-sales-Oder-list',id]);
  }

  deleteSaleOrder(id:number){
    Swal.fire({
      title: "Are you sure you want to delete this Sale Order ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if(result.isConfirmed){
        this.saleService.deleteSalesOrder(id).subscribe({
          next:()=>{
            Swal.fire('Deleted!', 'The Sale Order has been deleted.', 'success');
            this.loadSaleOrder();
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

  addSale(){
    this.router.navigate(['/admin/sale/sales']);
  }

  private location = inject(Location);
  goBack(){
    this.location.back();
  }

}
