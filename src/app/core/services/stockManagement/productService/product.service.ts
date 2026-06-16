import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../../shared/models/StockManagment/product.model';
import { ProductDTO } from '../../../../shared/models/dto/stockManagmentDTO/product.dto';
import { ReferenceRequest } from '../../../../shared/models/Request/ReferenceRequest';
import { DesignationRequest } from '../../../../shared/models/Request/DesignationRequest';
import { CategoryRequest } from '../../../../shared/models/Request/CategoryRequest';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
private apiUrl = 'http://localhost:8080/api/product';
private http = inject(HttpClient);


addProduct(product:ProductDTO):Observable<Product>{
  console.log("le product Envoi au backend ",product);
  return this.http.post<ProductDTO>(`${this.apiUrl}/addProduct`,product);
}


findProductById(id:number):Observable<Product>{
  return this.http.get<Product>(`${this.apiUrl}/find/${id}`);
}

getProducts() : Observable<Product[]>{
  return this.http.get<Product[]>(`${this.apiUrl}/ListProducts`);

}

deleteProduct(productId:number):Observable<string>{
  return this.http.delete<string>(`${this.apiUrl}/delete/${productId}`);
}

editProduct(product:ProductDTO,id:number,):Observable<Product>{
  return this.http.put<Product>(`${this.apiUrl}/update/${id}`,product);
}

findProductByReference(keyword:ReferenceRequest):Observable<Product[]>{
  return this.http.post<Product[]>(`${this.apiUrl}/searchByReference`,keyword);
}
findProductByDesignation(keyword:DesignationRequest):Observable<Product[]>{
  return this.http.post<Product[]>(`${this.apiUrl}/searchByDesignation`,keyword);
}
findProductByCategoryName(keyword:CategoryRequest):Observable<Product[]>{
  return this.http.post<Product[]>(`${this.apiUrl}/searchByCategoryName`,keyword);
}



}