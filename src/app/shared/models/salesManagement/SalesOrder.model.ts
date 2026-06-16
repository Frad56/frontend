import { PaymentType } from "../enum/paymentType";
import { SalesOrderLine } from "./SalesOrderLine.model";

export interface SalesOrder {
    salesOrderId:number;
    clientId?: number;
    paymentType: PaymentType;
    totalAmount: number;
    lines: SalesOrderLine[];
  }