import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';
import { ProductVariant } from '../../../../shared/models/StockManagment/ProductVariant.model';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../../shared/models/salesManagement/cartItem.model';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductUnitSale } from '../../../../shared/models/StockManagment/ProductUnitSale.model';
import { Router } from '@angular/router';
import { ProductUnitSaleService } from '../../../../core/services/stockManagement/productUnitSaleService/product-unit-sale.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  @Input() items: CartItem[] = [];
  @Output() cartUpdated = new EventEmitter<CartItem[]>();

  notify() {
    this.cartUpdated.emit(this.items);
  }

  increaseQuantity(item: CartItem) {
    if (item.quantity < item.quantityInStock) {
      item.quantity++;
      this.notify();
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Stock limité',
        text: 'Maximum stock reached',
        confirmButtonColor: '#1e88e5'
      });
    }
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.notify();
    }
  }

  removeProduct(item: CartItem) {
    this.items = this.items.filter(p => p.productVariantId !== item.productVariantId);
    this.notify();
  }


  onSaleUnitSelected(item: CartItem, selectedPus: ProductUnitSale) {
    item.unitPrice = selectedPus.unitPrice;
    item.productUnitSaleId = selectedPus.productUnitSaleId;
    this.notify();
  }

  router= inject(Router);
  addProductVariantUnitSale(productVariantId:number){
    this.router.navigate(['/admin/productUnitSale/add-productUnitSale-with-product-varaint-id', productVariantId]);
  }


  private productUnitSaleService = inject(ProductUnitSaleService);
  protected productUnitPurchaseMap = new Map<number, ProductUnitSale[]>();

 
  findProductVariantUnitSale(productVariantId: number) {
    this.productUnitSaleService.findProductUnitSaleByProductVariantId(productVariantId).subscribe({
      next: (result) => {
        this.productUnitPurchaseMap.set(productVariantId, result);
        this.cdr.detectChanges();  
        console.log("ProductUnitSale for variant", productVariantId, ":", result);
      },
      error: (err) => {
        console.error("Error fetching ProductUnitSale for variant:", err);
      }
    });
  }


  private cdr = inject(ChangeDetectorRef); 
  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'] && this.items.length > 0) {
      this.items.forEach(item => {
        if (!this.productUnitPurchaseMap.has(item.productVariantId)) {
          this.findProductVariantUnitSale(item.productVariantId);
        }
      });
    }
  }
}
