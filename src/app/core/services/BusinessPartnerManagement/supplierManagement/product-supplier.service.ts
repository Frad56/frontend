import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ProductSupplierDTO } from '../../../../shared/models/dto/BusinessPartnerDTO/supplierManagementDTO/productSupplier.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductSupplierService {

  private apiUrl = 'https://finalstockmanagement-8.onrender.com/api/productSupplier';
  private http = inject(HttpClient);


  constructor() { }

  addProductSupplier(productSupplier:ProductSupplierDTO){
    return this.http.post<ProductSupplierDTO>(`${this.apiUrl}/addProductSupplier`,productSupplier);
  }

  
}
