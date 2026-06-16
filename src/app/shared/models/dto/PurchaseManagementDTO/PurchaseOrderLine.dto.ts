

export interface PurchaseOrderLineDTO{

    purchaseOrderId:number;
    productVariantId:number;
    unitId:number;

    quantity:number;
    discount:string;

    unitPriceHt:number;
    unitPriceTTC:number;

    totalHT:number;
    totalTTC:number;

    tax:number;
    total:number;



}