export interface QuotationLine{
quotationLineId?:number;
quotationId?:number;

productVariantId?:number;
quantity?:number;
productUnitSaleId?:number | null; 
productVariantCode?:string;
unitPrice?:number;
discount?:number;
characteristicValue?: { [key: string]: string }; 
quotationLineTotal?:number;
}