import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { QuotationLine } from '../../../../shared/models/quotationManagement/QuotationLine.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotationLineServiceService {

  private apiUrl = 'http://localhost:8080/api/quotationLine';
  private http = inject(HttpClient);

  findQuotatioLinesByQuotationId(id:number):Observable<QuotationLine[]>{
    return this.http.get<QuotationLine[]>(`${this.apiUrl}/findByQuotationId/${id}`);
  }
  findQuotatioLinesById(id:number):Observable<QuotationLine>{
    return this.http.get<QuotationLine>(`${this.apiUrl}/findById/${id}`);
  }

  editQuotationLine(quotationLine:QuotationLine , quotationLineId:number):Observable<QuotationLine>{
    return this.http.put<QuotationLine>(`${this.apiUrl}/update/${quotationLineId}`,quotationLine);
  }

  deleteQuotationLine(quotationLineId:number):Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/delete/${quotationLineId}`);
  }

  addQuotationLine(quotation :QuotationLine):Observable<QuotationLine>{
    return this.http.post<QuotationLine>(`${this.apiUrl}/quotationLine`,quotation)
  
  }
}
