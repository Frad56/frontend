import { Routes } from "@angular/router";
import { CharacteristicEditComponent } from "./pages/characteristic-edit/characteristic-edit.component";
import { CharacteristicListComponent } from "./pages/characteristic-list/characteristic-list.component";
import { CharacteristicCreateComponent } from "./pages/characteristic-create/characteristic-create.component";
import { AuthGuard } from "../../../auth/guards/auth.guard";



export const CHARACTERISTIC_ROUTES:Routes=[
 {path:'characteristic-list', component: CharacteristicListComponent},
 {path:'add-characteristic', component: CharacteristicCreateComponent ,canActivate: [AuthGuard], data: { role: [ 'ADMIN'] }},
 {path:'add-characteristic-with-productId/:id', component: CharacteristicCreateComponent ,canActivate: [AuthGuard], data: { role: [ 'ADMIN'] }},
 {path:'edit-characteristic/:id',component:CharacteristicEditComponent ,canActivate: [AuthGuard], data: { role: [ 'ADMIN'] }},
]