import { QuotationLine } from "./QuotationLine.dto";

export interface Quotation{

    quotationId?:number;
    quotationDate?:number;
    totalAmount?:number;

    clientId?:number;
    clientFirstName?:string;
    clientLastName?:string;
    clientNumber?:string;

    quotationLineListDTO : QuotationLine[];
}