export interface SalesOrderRespDTO{


    salesOrderLineId    :number;
    salesOrderId  :number;
    productVariantId :number;



      productVariantCode   :string;
      productReference   :string;
      productDesignation   :string;
      productBrand   :string;



    productUnitSaleId   :number;

    quantity   :number;
    unitPrice   :number;
    total   :number;
    discount   :number;
    totalAfterDiscount   :number;
}