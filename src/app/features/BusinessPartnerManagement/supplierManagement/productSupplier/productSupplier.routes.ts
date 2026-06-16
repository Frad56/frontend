import { Routes } from "@angular/router";
import { ListProductSupplierComponent } from "./pages/list-product-supplier/list-product-supplier.component";
import { CreateProductSupplierComponent } from "./pages/create-product-supplier/create-product-supplier.component";
import { UpdateProductSupplierComponent } from "./pages/update-product-supplier/update-product-supplier.component";
import { AuthGuard } from "../../../../auth/guards/auth.guard";

export const PRODUCT_SUPPLIER_ROUTES :Routes= [
    {path:'product-suppliers', component:ListProductSupplierComponent,canActivate: [AuthGuard], data: { role: [ 'ADMIN'] }},
    {path:'add-product-supplier', component:CreateProductSupplierComponent,canActivate: [AuthGuard], data: { role: [ 'ADMIN'] }},
    {path:'update-product-supplier/:id', component:UpdateProductSupplierComponent,canActivate: [AuthGuard], data: { role: [ 'ADMIN'] }},
]