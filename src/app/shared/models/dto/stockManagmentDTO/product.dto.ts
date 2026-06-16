export interface ProductDTO {
   

    reference: string;
    designation: string;
    brand: string;
    description: string;
    basePrice: number;
    categoryId: number;
    aisleId?:number;
}