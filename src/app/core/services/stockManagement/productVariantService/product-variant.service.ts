import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ProductVariant } from '../../../../shared/models/StockManagment/ProductVariant.model';
import { ProductVariantDTO } from '../../../../shared/models/dto/stockManagmentDTO/ProductVariant.dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReferenceRequest } from '../../../../shared/models/Request/ReferenceRequest';
import { CategoryRequest } from '../../../../shared/models/Request/CategoryRequest';
import { DesignationRequest } from '../../../../shared/models/Request/DesignationRequest';
import { Product } from '../../../../shared/models/StockManagment/product.model';
import { CodeRequest } from '../../../../shared/models/Request/CodeRequest';

@Injectable({
  providedIn: 'root'
})
export class ProductVariantService {

  private apiUrl = 'http://localhost:8080/api/productVariant';
  private http = inject(HttpClient);

  getProductVariant():Observable<ProductVariant[]>{
    return this.http.get<ProductVariant[]>(`${this.apiUrl}/ListProductVariants`);
  }

  addProductVariant(productVariant : ProductVariantDTO):Observable<ProductVariant>{
    console.log("productVariant service is called to add a new productVariant");
    return this.http.post<ProductVariant>(`${this.apiUrl}/addProductVariant`,productVariant);
  }

  findProductVariantById(id:number):Observable<ProductVariant>{
    return this.http.get<ProductVariant>(`${this.apiUrl}/find/${id}`);
  }

  editProductVariant(productVariant:ProductVariantDTO , productVariantId:number):Observable<ProductVariant>{
    return this.http.put<ProductVariant>(`${this.apiUrl}/update/${productVariantId}`,productVariant);
  }

  deleteProductVariant(productVariantId:number):Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/delete/${productVariantId}`);
  }

  hasProductVariants(productId:number):Observable<{ hasVariants: boolean }>{
    return this.http.get<{ hasVariants: boolean }>(`${this.apiUrl}/${productId}/has-variants`);
  }

  findProductVariantbyProductId(productId:number):Observable<ProductVariant[]>{
    return this.http.get<ProductVariant[]>(`${this.apiUrl}/products/${productId}/variants`);
  }


  
  findProductVariantByProductDesignation(designationRequest: DesignationRequest): Observable<ProductVariant[]> {
    return this.http.post<ProductVariant[]>(`${this.apiUrl}/findByProductDesignation`,designationRequest
    );
  }
  findProductVariantByCategoryName(categoryRequest: CategoryRequest): Observable<ProductVariant[]> {
    return this.http.post<ProductVariant[]>(`${this.apiUrl}/findByCategoryName`,categoryRequest
    );
  }

  findProductVariantByProductReference(referenceRequest:ReferenceRequest):Observable<ProductVariant[]>{
    return this.http.post<ProductVariant[]>(`${this.apiUrl}/findByProductReference`,referenceRequest);
  }
  

  findProductByReference(keyword:ReferenceRequest):Observable<Product[]>{
    return this.http.post<Product[]>(`${this.apiUrl}/searchProductByReference`,keyword);
  }
  findProductByDesignation(keyword:DesignationRequest):Observable<Product[]>{
    return this.http.post<Product[]>(`${this.apiUrl}/searchProductByDesignation`,keyword);
  }
  findProductByCategoryName(keyword:CategoryRequest):Observable<Product[]>{
    return this.http.post<Product[]>(`${this.apiUrl}/searchProductByCategoryName`,keyword);
  }
  findProductVariantByCode(keyword:CodeRequest):Observable<ProductVariant[]>{
    return this.http.post<ProductVariant[]>(`${this.apiUrl}/searchProductVariantByCode`,keyword);
  }

  private variantsSubject = new BehaviorSubject<ProductVariant[]>([]);
  setVariants(variants: ProductVariant[]) {
    this.variantsSubject.next(variants);
  }
  variants$ = this.variantsSubject.asObservable();


  private variantsSelectedListSubject = new BehaviorSubject<ProductVariant[]>([]);
  
  setVariantsSelected(newVariants: ProductVariant[]) {
  const current = this.variantsSelectedListSubject.getValue();

  const merged = [...current];

  newVariants.forEach(newVar => {
    const exists = merged.some(
      v => v.productVariantId === newVar.productVariantId
    );

    if (!exists) {
      merged.push(newVar);
    }
  });

  this.variantsSelectedListSubject.next(merged);
}
  variantsSelected$ = this.variantsSelectedListSubject.asObservable();
  removeVariantSelected(variantId: number) {
    const current = this.variantsSelectedListSubject.getValue();
    this.variantsSelectedListSubject.next(
      current.filter(v => v.productVariantId !== variantId)
    );
  }
  resetVariantSelectedList(){
    this.variantsSelectedListSubject.next([]);
  }
}
