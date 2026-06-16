import { Characteristic } from "./Characteristic.model";
import { Product } from "./product.model";

export class ProductCharacteristic{
    productCharacteristicId!:number;
    product!:Product;
    characteristic!:Characteristic; 
}
