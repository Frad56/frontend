import Decimal from "decimal.js";
import { Status } from "../../enum/status";

export interface PurchaseOrderDTO{

    supplierId:number;
    status:Status;
    totalAmount:number;
    
}