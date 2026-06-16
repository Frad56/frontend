import { MovementInStockType } from "../enum/MovementInStockType";
import { ProductVariant } from "./ProductVariant.model";
import { Unit } from "./Unit.model";

export class MovementInStock{
    movementInStockId!:number;
    date!:Date;
    movementInStockType!:MovementInStockType;
    quantity!:number;
    productVariant!:ProductVariant;

}