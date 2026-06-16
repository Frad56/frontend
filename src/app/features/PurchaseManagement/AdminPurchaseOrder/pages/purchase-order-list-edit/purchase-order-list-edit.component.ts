import { Component, inject } from '@angular/core';
import { PurchaseOrderService } from '../../../../../core/services/PurchaseManagement/PurchaseOrder/purchase-order.service';
import { CommonModule,Location } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { PurchaseOrder } from '../../../../../shared/models/PurchaseManagement/PurchaseOrder.model';
import { PurchaseOrderLineService } from '../../../../../core/services/PurchaseManagement/PurchaseOrderLine/purchase-order-line.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrderLine } from '../../../../../shared/models/PurchaseManagement/PurchaseOrderLine.model';

@Component({
  selector: 'app-purchase-order-list-edit',
  standalone: true,
  imports: [CommonModule
    ,MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './purchase-order-list-edit.component.html',
  styleUrl: './purchase-order-list-edit.component.css'
})
export class PurchaseOrderListEditComponent {

  private location = inject(Location);
  private purchaseOrderService = inject(PurchaseOrderService);
  private purchaseOrderLineService = inject(PurchaseOrderLineService);

  protected purchaseOrders:PurchaseOrder[] =[];
  displayedColumns: string[] = ['Product_designation', 'Product_variant_code', 'Product_reference', 'Product_quantity', 'Product_Unit','discount','total','actions'];
  id!:number;
  purchaseOrderLines:PurchaseOrderLine[] =[];
  private route = inject(ActivatedRoute);

  ngOnInit(){
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("id : ",this.id);
    this.findPurchaseOrderLineListByOrderId(this.id);
  }

  findPurchaseOrderLineListByOrderId(id:number){  
    this.purchaseOrderLineService.getListByPurchaseOrderId(id).subscribe({
      next:(response)=>{
        console.log("Purchase Orders:", response);
        this.purchaseOrderLines = response;

      },
      error:(error)=>{
        console.error("Error fetching purchase orders:", error);
      }
    }) ;
  }

  deletePurchaseOrderLine(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.purchaseOrderLineService.deletePurchaseOrderLine(id).subscribe({
          next:(response)=>{
            Swal.fire(
              'Deleted!',
              'Your Purchase Order Line has been deleted.',
              'success'
            )
            this.findPurchaseOrderLineListByOrderId(this.id);
          },
          error:(error)=>{
            console.error("Error deleting purchase order line:", error);
            Swal.fire(
              'Error!',
              'There was an error deleting the purchase order line.',
              'error'
            )
          }
        })
      }
    })
  }

  private router = inject(Router);
  editPurchaseOrderLine(id:number){
    this.router.navigate(['/admin/purchase-order/edit-purchase-order-line',id]);


  }


  goBack(){
    this.location.back();
  }
}
