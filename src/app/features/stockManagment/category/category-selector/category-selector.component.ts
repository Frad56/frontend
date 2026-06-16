import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CategoryTest } from '../../../../shared/models/StockManagment/CategoryTest.model';
import { CategoryService } from '../../../../core/services/stockManagement/categoryService/category.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-selector.component.html',
  styleUrl: './category-selector.component.css'
})
export class CategorySelectorComponent {

  @Input() categories: CategoryTest[] = [];

  @Output() categoryDeleted = new EventEmitter<void>();

  categoryService = inject(CategoryService);

  deleteCategory(id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete this category?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'The category has been deleted.', 'success');
            this.categoryDeleted.emit();
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.error?.message || 'An error occurred while deleting!'
            });
          }
        });
      }
    });
  }
}