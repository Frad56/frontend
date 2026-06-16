import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Quotation } from '../../../../shared/models/quotationManagement/Quotation.dto';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  private apiUrl = 'http://localhost:8080/api/quotation';
  private http = inject(HttpClient);

  addQuotation(quotation :Quotation):Observable<Quotation>{
    return this.http.post<Quotation>(`${this.apiUrl}/quotation`,quotation)
  
  }

  getQuotations():Observable<Quotation[]>{
    return this.http.get<Quotation[]>(`${this.apiUrl}/quotationList`);
  }

  deleteQuotation(quotationId:number):Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/delete/${quotationId}`);
  }
}
