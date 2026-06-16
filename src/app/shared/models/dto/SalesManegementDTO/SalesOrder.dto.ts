import { PaymentType } from "../../enum/paymentType";
import { SalesOrderLineDTO } from "./SalesOrderLine.dto";

export interface SalesOrderDTO{

    clientId?:number;

    clientLastName?:string;
    clientFirstName?:string;
    
    paymentType:PaymentType;
    salesOrderLineListDTO: SalesOrderLineDTO[];
}