import { Aisle } from "./Aisle.model";
import { Category } from "./Category.model";

export class Product {
    productId?: number;
    reference?: string;
    designation?: string;
    brand?: string;
    description?: string;
    basePrice?: number;
    category?: Category;
    aisle?:Aisle;

}