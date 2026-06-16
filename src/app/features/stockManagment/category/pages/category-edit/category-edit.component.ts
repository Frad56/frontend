import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CategoryService } from '../../../../../core/services/stockManagement/categoryService/category.service';
import { Category } from '../../../../../shared/models/StockManagment/Category.model';
import { CategoryDTO } from '../../../../../shared/models/dto/stockManagmentDTO/Category.dto';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css'
})
export class CategoryEditComponent implements OnInit {



  private location = inject(Location);
  private categoryService = inject(CategoryService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  id!:number;
  parentCategories!:Observable<Category[]>;
  categoryForm = this.fb.group({
    name :[''] ,
    description:[''],
    parentId:[]
  });

  private mapToCategoryDTO():CategoryDTO{
    return this.categoryForm.getRawValue() as unknown as Category;
  }

  ngOnInit(): void {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      if(this.id){
        this.categoryService.findCategoryById(this.id).subscribe({

          next:(category)=>{
            console.log("category",category);

            this.categoryForm.patchValue({
              name:category.name,
              description:category.description,
            
            });
          },error:(err)=>{
            console.log("Error editing category")
          }
        });
      }
      this.parentCategories = this.categoryService.findCategoriesWithoutProducts();

  }

onSubmit(){
  if(this.categoryForm.invalid) return;
  const categoryDTO = this.mapToCategoryDTO();
  console.log("categoryDTO",categoryDTO);
  this.categoryService.editCategory(categoryDTO,this.id).subscribe({
    next:()=>{
      alert("category edtied successfully");
      this.location.back();
    },
    error: (err) => {
      console.error('Error edting category', err);
    
      console.log("la response ",categoryDTO);
    }
  })
}
goBack(){
  this.location.back();
}
}
