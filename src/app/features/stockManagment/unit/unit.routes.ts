
import { Routes } from "@angular/router";
import { UnitCreateComponent } from "./pages/unit-create/unit-create.component";
import { UnitListComponent } from "./pages/unit-list/unit-list.component";
import { UnitEditComponent } from "./pages/unit-edit/unit-edit.component";
import { AuthGuard } from "../../../auth/guards/auth.guard";

export const Unit_ROUTES:Routes = [
    
    { path:'unit-list', component :UnitListComponent},
    {path:'add-unit',component:UnitCreateComponent ,canActivate: [AuthGuard], data: { role: [ 'ADMIN'] }},
    {path:'edit-unit/:id',component:UnitEditComponent ,canActivate: [AuthGuard], data: { role: [ 'ADMIN'] }}
];