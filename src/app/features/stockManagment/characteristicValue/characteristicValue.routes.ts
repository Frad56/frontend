import { Routes } from "@angular/router";
import { CharacteristicValueEditComponent } from "./pages/characteristic-value-edit/characteristic-value-edit.component";
import { CharacteristicValueListComponent } from "./pages/characteristic-value-list/characteristic-value-list.component";
import { CharacteristicValueCreateComponent } from "./pages/characteristic-value-create/characteristic-value-create.component";
import { AuthGuard } from "../../../auth/guards/auth.guard";

export const CHARACTERISTIC_VALUE_ROUTES:Routes = [
    
    { path:'characteristicValue-list', component :CharacteristicValueListComponent},
    {path:'add-characteristicValue',component:CharacteristicValueCreateComponent ,canActivate: [AuthGuard], data: { role: [ 'ADMIN'] }},
    {path:'edit-characteristicValue/:id',component:CharacteristicValueEditComponent ,canActivate: [AuthGuard], data: { role: [ 'ADMIN'] }}
];