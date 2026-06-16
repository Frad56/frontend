
import { Routes } from "@angular/router";
import { ProductUnitSaleListComponent } from "./pages/product-unit-sale-list/product-unit-sale-list.component";
import { ProductUnitSaleCreateComponent } from "./pages/product-unit-sale-create/product-unit-sale-create.component";
import { ProductUnitSaleEditComponent } from "./pages/product-unit-sale-edit/product-unit-sale-edit.component";
import { AuthGuard } from "../../../auth/guards/auth.guard";

export const PRODUCT_UNIT_SALE_ROUTES:Routes = [
    
    { path:'productUnitSale-list', component :ProductUnitSaleListComponent},
    {path:'add-productUnitSale',component:ProductUnitSaleCreateComponent},
    {path:'productUnitSale-list-with-product-variant-id/:id',component:ProductUnitSaleListComponent},

    {path:'add-productUnitSale-with-product-varaint-id/:id',component:ProductUnitSaleCreateComponent},
    {path:'edit-productUnitSale/:id',component:ProductUnitSaleEditComponent, canActivate: [AuthGuard], data: { role: [ 'ADMIN'] }}
];