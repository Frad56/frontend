import { Routes } from "@angular/router";
import { PurchaseOrderCreateComponent } from "./purchase-order-create/purchase-order-create.component";
import { PurchaseOrderListEditComponent } from "./purchase-order-list-edit/purchase-order-list-edit.component";
import { CreatePurchaseOrderComponent } from "./create-purchase-order/create-purchase-order.component";
import { AdminPurchaseOrderListComponent } from "./admin-purchase-order-list/admin-purchase-order-list.component";
import { PurchaseOrderLineEditComponent } from "../../PurchaseOrderLine/pages/purchase-order-line-edit/purchase-order-line-edit.component";
import { AuthGuard } from "../../../../auth/guards/auth.guard";

export const ADMIN_PURCHASE_ORDER_ROUTES: Routes = [


    { path: 'add-purchase-order',      component: PurchaseOrderCreateComponent},
    { path: 'select-product-variants', component: CreatePurchaseOrderComponent},
  
    { path: 'not-delivered-purchase-orders',   component: AdminPurchaseOrderListComponent},
    { path: 'edit-purchase-order-list/:id',    component: PurchaseOrderListEditComponent},
    { path: 'edit-purchase-order-line/:id',    component: PurchaseOrderLineEditComponent},
  ];

