import { ProductVariant } from "./ProductVariant.model";
import { Unit } from "./Unit.model";
import { Product } from "./product.model";

export class ProductUnitSale{
    productUnitSaleId!:number;
    productVariant!:ProductVariant;
    unit!:Unit;
    unitPrice!:number;
    conversionFactor!:number;

}