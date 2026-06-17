import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Unit } from '../../../../shared/models/StockManagment/Unit.model';
import { UnitDTO } from '../../../../shared/models/dto/stockManagmentDTO/Unit.dto';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  private apiUrl = 'https://finalstockmanagement-8.onrender.com/api/unit';
  private http = inject(HttpClient);

  getUnits():Observable<Unit[]>{
    return this.http.get<Unit[]>(`${this.apiUrl}/ListUnits`);
  }

  addUnit(productVariant : UnitDTO):Observable<Unit>{
    console.log("Unit service is called to add a new Unit");
    return this.http.post<Unit>(`${this.apiUrl}/addUnit`,productVariant);
  }

  findUnitById(id:number):Observable<Unit>{
    return this.http.get<Unit>(`${this.apiUrl}/find/${id}`);
  }

  editUnit(unit:UnitDTO , shelfId:number):Observable<Unit>{
    return this.http.put<Unit>(`${this.apiUrl}/update/${shelfId}`,unit);
  }

  deleteUnit(unitId:number):Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/delete/${unitId}`);
  }
}
