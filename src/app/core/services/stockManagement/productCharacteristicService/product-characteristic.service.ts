import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCharacteristic } from '../../../../shared/models/StockManagment/ProductCharacteristic.model';
import { ProductCharacteristicDTO } from '../../../../shared/models/dto/stockManagmentDTO/ProductCharacteristic.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductCharacteristicService {

  private apiUrl = 'https://finalstockmanagement-8.onrender.com/api/productCharacteristic';
  private http = inject(HttpClient);

  getProductCharacteristic():Observable<ProductCharacteristic[]>{
    return this.http.get<ProductCharacteristic[]>(`${this.apiUrl}/ListProductCharacteristics`);
  }

  addProductCharacteristic(productCharacteristic : ProductCharacteristicDTO):Observable<ProductCharacteristic>{
    console.log("ProductCharacteristic service is called to add a new ProductCharacteristic");
    return this.http.post<ProductCharacteristic>(`${this.apiUrl}/addProductCharacteristic`,productCharacteristic);
  }

  findProductCharacteristicById(id:number):Observable<ProductCharacteristic>{
    return this.http.get<ProductCharacteristic>(`${this.apiUrl}/find/${id}`);
  }

  editProductCharacteristic(productCharacteristic:ProductCharacteristicDTO , productCharacteristicId:number):Observable<ProductCharacteristic>{
    return this.http.put<ProductCharacteristic>(`${this.apiUrl}/update/${productCharacteristicId}`,productCharacteristic);
  }

  deleteProductCharacteristic(productCharacteristicId:number):Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/delete/${productCharacteristicId}`);
  }
 
  addListProductCharacteristic(characteristicIds : Number[],producId:number):Observable<ProductCharacteristic[]>{
    return this.http.post<ProductCharacteristic[]>
    (`${this.apiUrl}/addProductCharacteristicList/${producId}`,characteristicIds);
  }

  getProductCharacteristicsByProductId(productId:number):Observable<ProductCharacteristic[]>{
    return this.http.get<ProductCharacteristic[]>(`${this.apiUrl}/allProductCharacteristicsByProductId/${productId}`);
  }
}
