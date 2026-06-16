import Decimal from "decimal.js";
import { ProductVariant } from "../StockManagment/ProductVariant.model";
import { PurchaseOrder } from "./PurchaseOrder.model";
import { Unit } from "../StockManagment/Unit.model";
import { ProductUnitPurchase } from "../StockManagment/ProductUnitPurchase.model";

export class PurchaseOrderLine{

    purchaseOrderLineId!:number;
    purchaseOrder!:PurchaseOrder;
    productVariant!:ProductVariant;
    productUnitPurchase!:ProductUnitPurchase;
    quantity!:number;
    discount!:string;
    unitPriceHt!:number;
    unitPriceTTC!:number;
    totalHT!:number;
    totalTTC!:number;
    tax!:number;
    total!:number;

}