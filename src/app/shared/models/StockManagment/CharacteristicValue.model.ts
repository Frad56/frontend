import { Characteristic } from "./Characteristic.model";
import { ProductVariant } from "./ProductVariant.model";

export class CharacteristicValue{

    characteristicValueId!:number;
    characteristic!:Characteristic;
    productVariant!:ProductVariant;
    value!:string; 
    
    
}