import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesManagementService {

  private apiUrl = 'https://finalstockmanagement-8.onrender.com/api/aisle';
  private http = inject(HttpClient);
}
