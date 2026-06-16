import Decimal from "decimal.js";
import { Supplier } from "../BusinessPartner/SupplierManagement/Suplier.model";
import { Status } from "../enum/status";



export class PurchaseOrder{

    purchaseOrderId!:number;
    supplier!:Supplier;
    orderDate!:Date;
    status!:Status;
    totalAmount!:number;
}