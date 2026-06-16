import { Unit } from "./Unit.model";
import { Product } from "./product.model";

export class ProductUnitPurchase{
    productUnitPurchaseId!:number;
    productVariant!:Product;
    unit!:Unit;
    unitPrice!:number;
    conversionFactor!:number;
}