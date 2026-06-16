import { Component, inject } from '@angular/core';
import { CreatePurchaseOrderComponent } from "../../../../purchaseManagement/AdminPurchaseOrder/pages/create-purchase-order/create-purchase-order.component";
import { PurchaseOrderCreateComponent } from "../../../../purchaseManagement/AdminPurchaseOrder/pages/purchase-order-create/purchase-order-create.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-magasiner-dashboard',
  standalone: true,
  imports: [ PurchaseOrderCreateComponent],
  templateUrl: './magasiner-dashboard.component.html',
  styleUrl: './magasiner-dashboard.component.css'
})
export class MagasinerDashboardComponent {
  router = inject(Router);
  changePassword(){
    this.router.navigate(['/changePassword']);
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('isFirstLogin');
    this.router.navigate(['/login']);
  }
}
