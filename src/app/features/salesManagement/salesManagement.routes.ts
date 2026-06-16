import { Routes } from "@angular/router";
import { ProductVariantSearchByCodeComponent } from "./saleOperation/product-variant-search-by-code/product-variant-search-by-code.component";
import { CartComponent } from "./saleOperation/cart/cart.component";
import { CheckoutComponent } from "./saleOperation/checkout/checkout.component";
import { SalesComponent } from "./saleOperation/sales/sales.component";
import { SalesListComponent } from "./sales-list/sales-list.component";
import { EditSalesOrderListComponent } from "./edit-sales-order-list/edit-sales-order-list.component";
import { EditSaleOrderLineComponent } from "./edit-sale-order-line/edit-sale-order-line.component";

export const SALES_MANAGEMENT_ROUTES:Routes=[

{path:'cart',component:CartComponent},
{path:'chekout',component:CheckoutComponent},
{path:'search-product-variant-by-code',component:ProductVariantSearchByCodeComponent},
{path:'sales',component:SalesComponent},
{path:'sales-list',component:SalesListComponent},

{path:'edit-sales-Oder-list/:id',component:EditSalesOrderListComponent},

{path:'edit-sales-Oder-line/:id',component:EditSaleOrderLineComponent},



    //PurchaseOrderListEditComponent

]