import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesManagementService {

  private apiUrl = 'http://localhost:8080/api/aisle';
  private http = inject(HttpClient);
}
