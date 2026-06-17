import { Injectable,Inject, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../../../shared/models/StockManagment/Category.model';
import{ Observable } from 'rxjs';
import { CategoryDTO } from '../../../../shared/models/dto/stockManagmentDTO/Category.dto';
import { CategoryTest } from '../../../../shared/models/StockManagment/CategoryTest.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://finalstockmanagement-8.onrender.com/api/category/';
  private http = inject(HttpClient);

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${this.apiUrl}ListCategories`);
  }

  addCategory(category : CategoryDTO):Observable<Category>{
    console.log("Category service is called to add a new category");
    return this.http.post<Category>(`${this.apiUrl}addCategory`,category);
  }

  findCategoryById(id:number):Observable<Category>{
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  editCategory(category:CategoryDTO , categoryId:number):Observable<Category>{
    return this.http.put<Category>(`${this.apiUrl}/update/${categoryId}`,category);
  }


deleteCategory(categoryId: number): Observable<string> {
  return this.http.delete(`${this.apiUrl}delete/${categoryId}`, {responseType: 'text'});
}

  leafCategoryList():Observable<Category[]>{
    return this.http.get<Category[]>(`${this.apiUrl}leafCategoryList`);
  }

  findCategoriesWithoutProducts():Observable<Category[]>{
    return this.http.get<Category[]>(`${this.apiUrl}findCategoriesWithoutProducts`);
  }



  getCategoryTree(): Observable<CategoryTest[]> {
    return this.http.get<CategoryTest[]>(`${this.apiUrl}tree`);
  }
  
  
}
