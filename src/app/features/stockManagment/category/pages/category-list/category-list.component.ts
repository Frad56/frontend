import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { Category } from '../../../../../shared/models/StockManagment/Category.model';
import { CategoryService } from '../../../../../core/services/stockManagement/categoryService/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent  implements OnInit{

  categorys$!:Observable<Category[]>;
  private categoryService = inject(CategoryService);

  ngOnInit():void{
    this.categorys$ = this.categoryService.getCategories();
  }
}
