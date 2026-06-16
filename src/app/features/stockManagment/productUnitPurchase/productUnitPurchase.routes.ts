
import { Routes } from "@angular/router";
import { ProductUnitPurchaseListComponent } from "./pages/product-unit-purchase-list/product-unit-purchase-list.component";
import { CreateProductUnitPurchaseComponent } from "./pages/create-product-unit-purchase/create-product-unit-purchase.component";

export const PRODUCT_UNIT_PURCHASE_ROUTES:Routes = [
    
    { path:'list', component :ProductUnitPurchaseListComponent},
    { path:'add/:id', component :CreateProductUnitPurchaseComponent},
];