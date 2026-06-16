import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../../../../core/services/stockManagement/categoryService/category.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryDTO } from '../../../../../shared/models/dto/stockManagmentDTO/Category.dto';
import { CommonModule, Location } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { Category } from '../../../../../shared/models/StockManagment/Category.model';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent implements OnInit {

  parentCategories!:Observable<Category[]>;
  
  private categoryService = inject(CategoryService);
  private location = inject (Location);

  categoryForm = new FormGroup({
    name : new FormControl(''),
    description: new FormControl(''),
    parentId:new FormControl('')
  })

  private mapFormCatgory():CategoryDTO
  {
    const v = this.categoryForm.getRawValue();
    const parentIdRaw = v.parentId;
    return {
      name: v.name ?? '',
      description: v.description ?? '',
      parentId: parentIdRaw ? parseInt(parentIdRaw) : null,
    };
  }

  ngOnInit() {
      this.parentCategories = this.categoryService.findCategoriesWithoutProducts();
  }

  onSubmit(){
    if(this.categoryForm.invalid) return;
    const categoryDTO = this.mapFormCatgory();
    this.categoryService.addCategory(categoryDTO).subscribe({
      next: (response) =>{
        console.log("Category created successfully",response);
        this.categoryForm.reset();
      },
      error:(err) => {
        console.log("Error creating Category",err);
      }
    })
  }


goBack(){
  this.location.back();
}
}
