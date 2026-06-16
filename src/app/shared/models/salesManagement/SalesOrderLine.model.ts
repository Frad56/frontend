import { CharacteristicValue } from "../StockManagment/CharacteristicValue.model";
import { ProductVariant } from "../StockManagment/ProductVariant.model";
import { SalesOrder } from "./SalesOrder.model";

export interface SalesOrderLine {
    productVariantId: number;
    salesOrderId:number;

    productVariantCode    : string;
    productReference      : string;
    productDesignation    : string;
    productBrand          : string;

    productUnitSaleName:string;
    productUnitSaleId : number;

    unitPrice: number;
    quantity: number;
    discount: number;
    total?: number;
    totalAfterDiscount?: number;
    characteristics?: CharacteristicValue[];
  }