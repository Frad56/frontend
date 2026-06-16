import { Routes } from "@angular/router";
import { CreateQuotationComponent } from "./creatingQuotation/create-quotation/create-quotation.component";
import { QuotationListComponent } from "./quotation-list/quotation-list.component";
import { QuotationLinesComponent } from "./quotationLines/quotation-lines/quotation-lines.component";
import { EditQuotationLineComponent } from "./quotationLines/edit-quotation-line/edit-quotation-line.component";

export const QUOTATION_ROUTES:Routes=[

    {path:'add',component:CreateQuotationComponent},
    {path:'list',component:QuotationListComponent},
    {path:'line-list/:id',component:QuotationLinesComponent},
    {path:'edit-line/:id',component:EditQuotationLineComponent}
    
    
    
        //PurchaseOrderListEditComponent
    
    ]