import { Routes } from "@angular/router";
import { MovementInStockListComponent } from "./pages/movement-in-stock-list/movement-in-stock-list.component";
import { AuthGuard } from "../../../auth/guards/auth.guard";

export const MOVEMENT_IN_STOCK_ROUTES:Routes = [
    
    { path:'movementInStock-list', component :MovementInStockListComponent, canActivate: [AuthGuard], data: { role: [ 'ADMIN'] }},

];