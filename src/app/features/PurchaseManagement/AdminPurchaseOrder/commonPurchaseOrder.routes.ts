import { Routes } from "@angular/router";
import { PurchaseOrderCreateComponent } from "./pages/purchase-order-create/purchase-order-create.component";
import { CreatePurchaseOrderComponent } from "./pages/create-purchase-order/create-purchase-order.component";
import { AuthGuard } from "../../../auth/guards/auth.guard";

export const COMMON_PURCHASE_ORDER_ROUTES: Routes = [


    { path: 'add-purchase-order',      component: PurchaseOrderCreateComponent},
    { path: 'select-product-variants', component: CreatePurchaseOrderComponent},
]
//
//{path:'common-purchase-order',  canActivate: [AuthGuard],
//data: { role: ['STOCK_KEEPER', 'ADMIN'] },loadChildren:()=>import('./features/purchaseManagement/AdminPurchaseOrder/commonPurchaseOrder.routes').then(m=>m.COMMON_PURCHASE_ORDER_ROUTES)},
