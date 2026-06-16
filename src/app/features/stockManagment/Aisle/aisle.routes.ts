import { Routes } from "@angular/router";
import { AisleListComponent } from "./pages/aisle-list/aisle-list.component";
import { AisleCreateComponent } from "./pages/aisle-create/aisle-create.component";
import { AisleEditComponent } from "./pages/aisle-edit/aisle-edit.component";
import { AuthGuard } from "../../../auth/guards/auth.guard";


export const Aisle_ROUTES:Routes=[
 {path:'list-aisle', component:AisleListComponent },
 {path:'add-aisle', component:AisleCreateComponent ,canActivate: [AuthGuard], data: { role: [ 'ADMIN'] }},
 {path:'edit-aisle/:id',component:AisleEditComponent ,canActivate: [AuthGuard], data: { role: [ 'ADMIN'] }},
]