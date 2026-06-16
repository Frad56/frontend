import { Routes } from "@angular/router";
import { ProductListComponent } from "./pages/product-list/product-list.component";
import { ProductCreateComponent } from "./pages/product-create/product-create.component";
import { ProductEditComponent } from "./pages/product-edit/product-edit.component";
import { AuthGuard } from "../../../auth/guards/auth.guard";

export const PRODUCT_ROUTES:Routes = [
    
    { path:'products', component :ProductListComponent,canActivate: [AuthGuard], data: { role: [ 'ADMIN'] }},
    {path:'add-product',component:ProductCreateComponent,canActivate: [AuthGuard], data: { role: [ 'ADMIN'] }},
    {path:'edit-product/:id',component:ProductEditComponent,canActivate: [AuthGuard], data: { role: [ 'ADMIN'] }}
];