import { Component,OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { ProductCharacteristic } from '../../../../../shared/models/StockManagment/ProductCharacteristic.model';
import { ProductCharacteristicService } from '../../../../../core/services/stockManagement/productCharacteristicService/product-characteristic.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-characteristic-list',
  standalone: true,
  imports: [CommonModule
    ,MatTableModule,
     MatCardModule,
     MatIconModule,
     MatButtonModule],
  templateUrl: './product-characteristic-list.component.html',
  styleUrl: './product-characteristic-list.component.css'
})
export class ProductCharacteristicListComponent implements OnInit {
productCharacteristic$ !:Observable<ProductCharacteristic[]>;
productCharacteristicService = inject(ProductCharacteristicService);
displayedColumns: string[] = ['productCharacteristicId', 'productReference', 'productDesignation', 'characteristicName','actions'];

private router = inject(Router);
private location = inject(Location);

loadProductCharacteristic(){
this.productCharacteristic$ = this.productCharacteristicService.getProductCharacteristic();
}
ngOnInit(): void {
    this.loadProductCharacteristic();
}

editProductCharacteristic(id:number){
  this.router.navigate(['productCharacteristic/edit-productCharacteristic',id]);
   }


   deleteProductCharacteristic(id:number){
    this.productCharacteristicService.deleteProductCharacteristic(id).subscribe(res => {
      alert("Product Characteristic Deleted !");
      this.loadProductCharacteristic();
    });
   
  }
  addProductCharacteristic(){
    this.router.navigate(['productCharacteristic/add-productCharacteristic']);
   }

   goBack(){
    this.location.back();
  }
    
  
}
