import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormStateService {
  
  private productFormData: any = null;

  setProductForm(data: any) {
    this.productFormData = data;
  }

  getProductForm() {
    return this.productFormData;
  }

  clearProductForm() {
    this.productFormData = null;
  }
}
