import { Routes } from "@angular/router";
import { CategoryCreateComponent } from "./pages/category-create/category-create.component";
import { CategoryListComponent } from "./pages/category-list/category-list.component";
import { CategorySelectorComponent } from "./category-selector/category-selector.component";
import { CategoryMenuComponent } from "./category-menu/category-menu.component";
import { CategoryEditComponent } from "./pages/category-edit/category-edit.component";
import { AuthGuard } from "../../../auth/guards/auth.guard";

export const CATEGORY_ROUTES:Routes = [
    
    { path:'category', component :CategoryListComponent},
    {path:'add-category',component:CategoryCreateComponent,canActivate: [AuthGuard], data: { role: [ 'ADMIN'] }},
    {path:'edit-category/:id',component:CategoryEditComponent,canActivate: [AuthGuard], data: { role: [ 'ADMIN'] }},
    {path:'category-selector',component:CategorySelectorComponent},
    {path:'menu',component:CategoryMenuComponent}

];