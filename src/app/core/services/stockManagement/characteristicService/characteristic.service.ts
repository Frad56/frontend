import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Characteristic } from '../../../../shared/models/StockManagment/Characteristic.model';
import { Observable } from 'rxjs';
import { CharacteristicDTO } from '../../../../shared/models/dto/stockManagmentDTO/Characteristic.dto';

@Injectable({
  providedIn: 'root'
})
export class CharacteristicService {


  private apiUrl = 'http://localhost:8080/api/characteristic';
  private http = inject(HttpClient);

  getCharacteristic():Observable<Characteristic[]>{
    return this.http.get<Characteristic[]>(`${this.apiUrl}/ListCharacteristics`);
  }

  addCharacteristic(characteristic : CharacteristicDTO):Observable<Characteristic>{
    console.log("characteristic service is called to add a new characteristic");
    return this.http.post<Characteristic>(`${this.apiUrl}/addCharacteristic`,characteristic);
  }

  findCharacteristicById(id:number):Observable<Characteristic>{
    return this.http.get<Characteristic>(`${this.apiUrl}/find/${id}`);
  }

  editCharacteristic(characteristic:CharacteristicDTO , characteristicId:number):Observable<Characteristic>{
    return this.http.put<Characteristic>(`${this.apiUrl}/update/${characteristicId}`,characteristic);
  }

  deleteCharacteristic(characteristicId:number):Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/delete/${characteristicId}`);
  }



}
