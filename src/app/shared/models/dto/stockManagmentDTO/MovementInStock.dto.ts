import { MovementInStockType } from "../../enum/MovementInStockType";

export interface MovementInStockDTO{

    date:Date;
    movementInStockType:MovementInStockType;
    quantityInStock:number;
    productVariantId:number;
    unitId:number;

}