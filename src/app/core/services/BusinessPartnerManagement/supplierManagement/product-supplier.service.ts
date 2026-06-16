import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ProductSupplierDTO } from '../../../../shared/models/dto/BusinessPartnerDTO/supplierManagementDTO/productSupplier.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductSupplierService {

  private apiUrl = 'http://localhost:8080/api/productSupplier';
  private http = inject(HttpClient);


  constructor() { }

  addProductSupplier(productSupplier:ProductSupplierDTO){
    return this.http.post<ProductSupplierDTO>(`${this.apiUrl}/addProductSupplier`,productSupplier);
  }

  
}
