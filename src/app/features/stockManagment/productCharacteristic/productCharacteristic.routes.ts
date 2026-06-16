import { Routes } from "@angular/router";
import { ProductCharacteristicListComponent } from "./pages/product-characteristic-list/product-characteristic-list.component";
import { ProductCharacteristicCreateComponent } from "./pages/product-characteristic-create/product-characteristic-create.component";
import { ProductCharacteristicEditComponent } from "./pages/product-characteristic-edit/product-characteristic-edit.component";
import { AuthGuard } from "../../../auth/guards/auth.guard";

export const PRODUCT_CHARACTERISTIC_ROUTES:Routes = [
    
    { path:'productCharacteristic-list', component :ProductCharacteristicListComponent},
    {path:'add-productCharacteristic',component:ProductCharacteristicCreateComponent ,canActivate: [AuthGuard], data: { role: [ 'ADMIN'] }},
    {path:'edit-productCharacteristic/:id',component:ProductCharacteristicEditComponent ,canActivate: [AuthGuard], data: { role: [ 'ADMIN'] }}
];