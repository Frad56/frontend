import { Product } from "./product.model";

export class ProductVariant{

        productVariantId!:number;
        code!:string;
        specificPrice?:number;
        quantityInStock?:number;
        product!:Product;

}