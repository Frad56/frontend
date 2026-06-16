import { Routes } from "@angular/router";
import { DevisComponent } from "./devis/devis.component";
import { CreateDevisComponent } from "./create-devis/create-devis.component";

export const Devis_ROUTES:Routes=[
    {path:'create-devis', component:CreateDevisComponent },
    {path:'add-devis', component:DevisComponent },
  
   ]