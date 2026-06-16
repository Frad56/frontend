import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ProductVariant } from '../../../../../shared/models/StockManagment/ProductVariant.model';
import { ProductUnitPurchaseService } from '../../../../../core/services/stockManagement/productUnitPurchase/product-unit-purchase.service';
import { ProductVariantService } from '../../../../../core/services/stockManagement/productVariantService/product-variant.service';
import { ProductUnitPurchase } from '../../../../../shared/models/StockManagment/ProductUnitPurchase.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-unit-purchase-list',
  standalone: true,
  imports: [CommonModule
    ,MatTableModule,
     MatCardModule,
     MatIconModule,
     MatButtonModule],
  templateUrl: './product-unit-purchase-list.component.html',
  styleUrl: './product-unit-purchase-list.component.css'
})
export class ProductUnitPurchaseListComponent {
  private location = inject(Location);
  private route = inject(ActivatedRoute);      
  
  
  productUnitSales$! : Observable<ProductUnitPurchase[]>;
  displayedColumns: string[] = [ 'productDescription','productReference', 'unit', 'unitPrice', 'conversionFactor','actions'];
  private productUnitPurchaseService  = inject(ProductUnitPurchaseService);
  private productVariantService = inject(ProductVariantService);
  productVariant!: ProductVariant;
  private router = inject(Router);
  productVariantId!: number;
  
  
    loadProductUnitSale() {
  
      if (this.productVariantId) {
        this.productUnitSales$ = this.productUnitPurchaseService.findProductUnitPurchaseByProductVariantId(this.productVariantId) as any;
      
        this.productVariantService.findProductVariantById(this.productVariantId).subscribe({
          next: (variant) => {
            this.productVariant = variant;
          },
          error: (err) => console.error('Error fetching product variant:', err)
        })
      } else {
        this.productUnitSales$ = this.productUnitPurchaseService.getAllProductUnitPurchase();
      }
    }
  
    ngOnInit(): void {
      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        this.productVariantId = +idParam;
      }
      this.loadProductUnitSale();
    }
  
  
  deleteProductUnitSale(id:number){
    this.productUnitPurchaseService.deleteProductUnitPurchase(id).subscribe(res => {
      alert("product Unit Purchase Deleted !");
      this.loadProductUnitSale();
    });
   
  }
  addProductUnitSale() {
    console.log('ADD CLICKED');
    if (this.productVariantId) {
          console.log('productVariantId =', this.productVariantId);
      this.router.navigate(['/admin/productUnitSale/add-productUnitSale-with-product-varaint-id/', this.productVariantId]);
    } else {
      console.log('no product id');
      this.router.navigate(['admin/productUnitSale/add-productUnitSale']);
    }
  }
  editProductUnitSale(productUnitSaleId:number){
    this.router.navigate(['admin/productUnitSale/edit-productUnitSale',productUnitSaleId]);
  
  }
  
  
  goBack(){
    this.location.back();
  }
}
