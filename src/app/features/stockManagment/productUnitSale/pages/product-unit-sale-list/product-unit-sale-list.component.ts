import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, Location } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductUnitSale } from '../../../../../shared/models/StockManagment/ProductUnitSale.model';
import { ProductUnitSaleService } from '../../../../../core/services/stockManagement/productUnitSaleService/product-unit-sale.service';
import { ProductVariantService } from '../../../../../core/services/stockManagement/productVariantService/product-variant.service';
import { ProductVariant } from '../../../../../shared/models/StockManagment/ProductVariant.model';

@Component({
  selector: 'app-product-unit-sale-list',
  standalone: true,
  imports: [CommonModule
    ,MatTableModule,
     MatCardModule,
     MatIconModule,
     MatButtonModule],
  templateUrl: './product-unit-sale-list.component.html',
  styleUrl: './product-unit-sale-list.component.css'
})
export class ProductUnitSaleListComponent  implements OnInit{
private location = inject(Location);
private route = inject(ActivatedRoute);      


productUnitSales$! : Observable<ProductUnitSale[]>;
displayedColumns: string[] = [ 'productDescription','productReference', 'unit', 'unitPrice', 'conversionFactor','actions'];
private productUnitSaleService  = inject(ProductUnitSaleService);
private productVariantService = inject(ProductVariantService);
productVariant!: ProductVariant;
private router = inject(Router);
productVariantId!: number;


  loadProductUnitSale() {

    if (this.productVariantId) {
      this.productUnitSales$ = this.productUnitSaleService.findProductUnitSaleByProductVariantId(this.productVariantId) as any;
      this.productVariantService.findProductVariantById(this.productVariantId).subscribe({
        next: (variant) => {
          this.productVariant = variant;
        },
        error: (err) => console.error('Error fetching product variant:', err)
      })
    } else {
      this.productUnitSales$ = this.productUnitSaleService.getAllProductUnitSale();
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
  this.productUnitSaleService.deleteProductUnitSale(id).subscribe(res => {
    alert("product Unit Sale Deleted !");
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
