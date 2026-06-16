import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../../../core/services/stockManagement/categoryService/category.service';
import { CategoryTest } from '../../../../shared/models/StockManagment/CategoryTest.model';
import { CategorySelectorComponent } from "../category-selector/category-selector.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCard } from '@angular/material/card';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-category-menu',
  standalone: true,
  imports: [
    CategorySelectorComponent,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCard,
      TranslateModule
  ],
  templateUrl: './category-menu.component.html',
  styleUrl: './category-menu.component.css'
})
export class CategoryMenuComponent implements OnInit {

  roots: CategoryTest[] = [];
  activeRoot?: CategoryTest;

  private translate = inject(TranslateService);
  categoryService = inject(CategoryService);
  private router = inject(Router);

  changeLanguage(lang: string): void {

    this.translate.use(lang);
  
    localStorage.setItem('lang', lang);
  
  }

     

  ngOnInit(): void {
    const lang = localStorage.getItem('lang') || 'en';
    this.translate.setDefaultLang('fr');
    this.translate.use(lang);
    this.loadCategories();
  }

  // Méthode séparée pour pouvoir la réappeler facilement
  loadCategories(): void {
    this.categoryService.getCategoryTree().subscribe({
      next: (data) => {
        this.roots = data;
        // Conserve la sélection active après refresh si elle existe encore
        if (this.activeRoot) {
          this.activeRoot = data.find(
            r => r.categoryId === this.activeRoot!.categoryId
          ) ?? (data.length ? data[0] : undefined);
        } else {
          this.activeRoot = data.length ? data[0] : undefined;
        }
      },
      error: (err) => console.error('Erreur chargement categories', err)
    });
  }

  setActive(root: CategoryTest) {
    this.activeRoot = root;
  }

  addCategory() {
    this.router.navigate(['/admin/category/add-category']);
  }

  onCategoryDeleted(): void {
    this.loadCategories();
  }

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
            this.loadCategories();
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
