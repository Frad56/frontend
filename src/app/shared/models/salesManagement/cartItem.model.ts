export interface CartItem {
    productVariantId: number;
    code: string;
    unitPrice: number;
    quantity: number;
    quantityInStock:number;
    discount: number;
    productUnitSaleId?: number | null; 
  }