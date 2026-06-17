import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CharacteristicValue } from '../../../../shared/models/StockManagment/CharacteristicValue.model';
import { Observable } from 'rxjs';
import { CharacteristicValueDTO } from '../../../../shared/models/dto/stockManagmentDTO/CharacteristicValue.dto';

@Injectable({
  providedIn: 'root'
})
export class CharacteristicValueService {

  private apiUrl = 'https://finalstockmanagement-8.onrender.com/api/characteristicValue';
  private http = inject(HttpClient);

  getAllCharacteristicValue():Observable<CharacteristicValue[]>{
    return this.http.get<CharacteristicValue[]>(`${this.apiUrl}/ListCharacteristicValues`);
  }

  addCharacteristicValue(category : CharacteristicValueDTO):Observable<CharacteristicValue>{
    console.log("Characteristic service is called to add a new Characteristic");
    return this.http.post<CharacteristicValue>(`${this.apiUrl}/addCharacteristicValue`,category);
  }

  findCharacteristicValueById(id:number):Observable<CharacteristicValue>{
    return this.http.get<CharacteristicValue>(`${this.apiUrl}/find/${id}`);
  }

  editCharacteristicValue(characteristicValue:CharacteristicValueDTO , characteristicValueId:number):Observable<CharacteristicValue>{
    return this.http.put<CharacteristicValue>(`${this.apiUrl}/update/${characteristicValueId}`,characteristicValue);
  }

  deleteCharacteristicValue(characteristicValueId:number):Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/delete/${characteristicValueId}`);
  }

  //save Values 
  saveAllCharacteristicValue(characteristics : CharacteristicValueDTO[]):Observable<CharacteristicValue[]>{
    return this.http.post<CharacteristicValue[]>(`${this.apiUrl}/save-all`,characteristics);
  }


  findCharacteristicValueListByProductVariantId(productVariantId: number):Observable<Record<string, string>> {
  return this.http.get<Record<string, string>>(`${this.apiUrl}/allCharacteristicValuesByProductVariantId/${productVariantId}`);
  }

  updateCharacteristics(id: number, values: { [key: string]: string }) {
    return this.http.put(`${this.apiUrl}/${id}/characteristics-update`,values,{ responseType: 'text' } 
    );
  }
/*
  findCharacteristicValueByProductVariantId(productVariantId:number):Observable<{characteristicName:String,characteristicValue:String}[]>{
    return this.http.get<{characteristicName:String,characteristicValue:String}[]>(`${this.apiUrl}/allCharacteristicValuesByProductVariantId/${productVariantId}`);
  }
  */
}
