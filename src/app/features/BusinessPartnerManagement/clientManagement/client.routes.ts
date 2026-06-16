import { Routes } from "@angular/router";
import { ListClientComponent } from "./list-client/list-client.component";
import { CreateClientComponent } from "./create-client/create-client.component";
import { UpdateClientComponent } from "./update-client/update-client.component";

export const CLIENT_ROUTES :Routes= [
    {path:'client-all', component:ListClientComponent},
    {path:'add-client', component:CreateClientComponent},
    {path:'edit-client/:id', component:UpdateClientComponent}
]