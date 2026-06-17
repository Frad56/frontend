import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../../../../shared/models/BusinessPartner/SupplierManagement/Suplier.model';
import { SupplierDTO } from '../../../../shared/models/dto/BusinessPartnerDTO/supplierManagementDTO/supplier.dto';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private apiUrl = 'https://finalstockmanagement-8.onrender.com/api/supplier';
  private http = inject(HttpClient);

  constructor() {}

  getSuppliers():Observable<Supplier[]>{
    return this.http.get<Supplier[]>(`${this.apiUrl}/suppliers`);
  }

  addSupplier(supplier: SupplierDTO):Observable<Supplier>{
    console.log("Supplier service is called to add a new supplier");
    return this.http.post<Supplier>(`${this.apiUrl}/addSupplier`,supplier);
  }

  findSuppliertById(id:number):Observable<Supplier>{
    return this.http.get<Supplier>(`${this.apiUrl}/find/${id}`);
  }
  deleteSupplier(supplierId:number):Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/delete/${supplierId}`);
  }
  editSupplier(supplier:SupplierDTO,id:number,):Observable<Supplier>{
    return this.http.put<Supplier>(`${this.apiUrl}/update/${id}`,supplier);
  }
}
