import { Component, computed, inject, signal } from '@angular/core';
import { ProductVariantService } from '../../../../../core/services/stockManagement/productVariantService/product-variant.service';
import { Observable } from 'rxjs';
import { ProductVariant } from '../../../../../shared/models/StockManagment/ProductVariant.model';
import { CommonModule ,Location} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import Swal from 'sweetalert2';
import { PurchaseOrderService } from '../../../../../core/services/PurchaseManagement/PurchaseOrder/purchase-order.service';
import { PurchaseOrderLineService } from '../../../../../core/services/PurchaseManagement/PurchaseOrderLine/purchase-order-line.service';
import { PurchaseOrder } from '../../../../../shared/models/PurchaseManagement/PurchaseOrder.model';
import { Router } from '@angular/router';


export interface ProductVariantItem {
  id: number;
  Reference: string;
  completed:boolean;
}
@Component({
  selector: 'app-admin-purchase-order-list',
  standalone: true,
  imports: [CommonModule
    ,MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule],
  templateUrl: './admin-purchase-order-list.component.html',
  styleUrl: './admin-purchase-order-list.component.css'
})
export class AdminPurchaseOrderListComponent {
  private location = inject(Location);
  private purchaseOrderService = inject(PurchaseOrderService);
  private purchaseOrderLineService = inject(PurchaseOrderLineService);

  protected purchaseOrders:PurchaseOrder[] =[];
  displayedColumns: string[] = ['companyName', 'contactName', 'orderDate','totalAmount','actions'];


  ngOnInit(){
    this.loadPurchaseOrders();
  }
  loadPurchaseOrders(){
    this.purchaseOrderService.getPurchaseOrderList().subscribe({
      next:(response)=>{
        console.log("Purchase Orders:", response);
        this.purchaseOrders = response;
      },
      error:(error)=>{
        console.error("Error fetching purchase orders:", error);
      }
    }) ;
  }

  private router = inject(Router);

 // findPurchaseOrderLineListByOrderId(id:number){
 //     this.purchaseOrderLineService.getListByPurchaseOrderId(id).subscribe({
  //      next:(response)=>{
    /*      alert("edit!")
          console.log("Purchase Orders:", response);
        },
        error:(error)=>{
          console.error("Error fetching purchase orders:", error);
        }
      }) ;
  }
  */
  editPurchaseOrderLineList(id:number){
    this.router.navigate(['/admin/purchase-order/edit-purchase-order-list',id]);
  }

  deletePurchaseOrder(id: number){
    Swal.fire({
      title: "Are you sure you want to delete this Purchase Order ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if(result.isConfirmed){
        this.purchaseOrderService.deletePurchaseOrder(id).subscribe({
          next:(response)=>{
            console.log("Purchase Order Deleted! :", response);
            Swal.fire('Deleted!', 'The Purchase Order has been deleted.', 'success');
            this.loadPurchaseOrders(); 
          },
          error:(error)=>{
            console.error("Error deleting purchase order:", error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.error?.message || 'An error occurred while deleting!'
            });
          }
        });
      }
    });
  }






  goBack(){
    this.location.back();
  }
}
