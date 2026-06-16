import { Component, inject } from '@angular/core';
import { ProductVariantService } from '../../../../../core/services/stockManagement/productVariantService/product-variant.service';
import { Observable } from 'rxjs';
import { ProductVariant } from '../../../../../shared/models/StockManagment/ProductVariant.model';
import { CommonModule ,Location} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';  


@Component({
  selector: 'app-create-purchase-order',
  standalone: true,
  imports: [CommonModule
    ,MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule],
  templateUrl: './create-purchase-order.component.html',
  styleUrl: './create-purchase-order.component.css'
})
export class CreatePurchaseOrderComponent {
  selection: boolean[] = [];
  protected productVariantSelectedList:ProductVariant[] = [];
  private productVariantService =inject(ProductVariantService);
  protected productVariants$!:Observable<ProductVariant[]>;
  displayedColumns: string[] = ['productVariantId', 'code', 'specificPrice', 'quantityInStock', 'productId','select'];

  ngOnInit(){
    this.productVariants$ = this.productVariantService.variants$;
    this.productVariants$.subscribe(data => {
      this.selection = data.map(() => false);
    });
    console.log("Selection elememnts")
  }
  setSelectedVariants(producVariant:ProductVariant): ProductVariant {
     this.productVariantSelectedList.push(producVariant);
     return producVariant;
  }
  saveSelection(){

    this.productVariantService.setVariantsSelected(this.productVariantSelectedList);
    console.log("Selected variants saved successfully!", this.productVariantSelectedList);
    this.goBack();
  }
 
  toggle(index: number, element: ProductVariant): void {
    //section contient true si il est selectionné et false sinon
    this.selection[index] = !this.selection[index];
  
    if (this.selection[index]) {
      const exists = this.productVariantSelectedList.some(
        pv => pv.productVariantId === element.productVariantId
      );
  
      if (!exists) {
        this.productVariantSelectedList.push(element);
        console.log("Current list:", this.productVariantSelectedList);
      }
  
    } else {
      this.productVariantSelectedList = this.productVariantSelectedList.filter(
        pv => pv.productVariantId !== element.productVariantId
      );
      console.log("Current list:", this.productVariantSelectedList);
    }
  }
  
  toggleAll(checked: boolean): void {
    this.selection = this.selection.map(() => checked);
  
    this.productVariants$.subscribe(list => {
      if (checked) {
        this.productVariantSelectedList = [...list];
      } else {
        this.productVariantSelectedList = [];
      }
    });
  }
  
  isAllSelected(): boolean {
    return this.selection.every(v => v);
  }
  
  isIndeterminate(): boolean {
    return this.selection.some(v => v) && !this.isAllSelected();
  }
  private location = inject(Location);
  goBack() {
    this.location.back();
  }
}
