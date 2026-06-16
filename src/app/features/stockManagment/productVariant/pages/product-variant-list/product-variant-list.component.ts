import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { ProductVariant } from '../../../../../shared/models/StockManagment/ProductVariant.model';
import { ProductVariantService } from '../../../../../core/services/stockManagement/productVariantService/product-variant.service';
import { CharacteristicValueService } from '../../../../../core/services/stockManagement/CharacteristicValueService/characteristic-value.service';

@Component({
  selector: 'app-product-variant-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './product-variant-list.component.html',
  styleUrl: './product-variant-list.component.css'
})
export class ProductVariantListComponent implements OnInit {

  private location = inject(Location);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productVariantService = inject(ProductVariantService);
  private characteristicValueService = inject(CharacteristicValueService);

  productVariants: ProductVariant[] = [];
  characteristicsMap: { [key: number]: any } = {};
  displayedColumns: string[] = [ 'code', 'specificPrice', 'quantityInStock', 'productId', 'charcteristic', 'actions'];

  // null = mode "tous les variants", number = mode "filtré par produit"
  filteredByProductId: number | null = null;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.filteredByProductId = idParam ? Number(idParam) : null;
    this.loadProductVariants();
  }

  loadProductVariants(): void {
    const request$ = this.filteredByProductId
      ? this.productVariantService.findProductVariantbyProductId(this.filteredByProductId)
      : this.productVariantService.getProductVariant();

    request$.subscribe({
      next: (variants) => {
        this.productVariants = variants;
        variants.forEach(v => this.loadCharacteristics(v.productVariantId));
      },
      error: (err) => console.error('Error fetching product variants:', err)
    });
  }

  loadCharacteristics(productVariantId: number): void {
    this.characteristicValueService
      .findCharacteristicValueListByProductVariantId(productVariantId)
      .subscribe({
        next: (response) => (this.characteristicsMap[productVariantId] = response),
        error: (err) => console.error('Error fetching characteristics for variant', productVariantId, err)
      });
  }

  addProductVariant(): void {
    if (this.filteredByProductId) {
      this.router.navigate(['/admin/productVariant/add-productVariant-with-productId', this.filteredByProductId]);
    } else {
      this.router.navigate(['/admin/productVariant/add-productVariant']);
    }
  }

  editProductVariant(id: number): void {
    this.router.navigate(['/admin/productVariant/edit-productVariant', id]);
  }

  deleteProductVariant(id: number): void {
    Swal.fire({
      title: 'Are you sure you want to delete this product Variant?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productVariantService.deleteProductVariant(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'The product Variant has been deleted.', 'success');
            this.loadProductVariants();
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

  addProductUnitsale(id:number){
    this.router.navigate(['/admin/productUnitSale/add-productUnitSale-with-product-varaint-id',id]);
  }

  findProductUnitSale(id: number) {
    this.router.navigate(['/admin/productUnitSale/productUnitSale-list-with-product-variant-id', id]);
  }
  goBack(): void {
    this.location.back();
  }
}