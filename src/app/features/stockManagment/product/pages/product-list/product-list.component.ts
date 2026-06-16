import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../../../shared/models/StockManagment/product.model';
import { ProductService } from '../../../../../core/services/stockManagement/productService/product.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
import { ProductVariantService } from '../../../../../core/services/stockManagement/productVariantService/product-variant.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule
            ,MatTableModule,
            MatCardModule,
            MatIconModule,
            MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products$! : Observable<Product[]>;
  displayedColumns: string[] = ['reference', 'designation', 'brand', 'description', 'basePrice','category','aisle','actions'];
  private productService  = inject(ProductService);
  private router = inject(Router);
  private location = inject(Location);
  private productVariantService = inject(ProductVariantService);
  condition!: boolean;
  showMessage: boolean = false;
  message: string = "";

  //productConditions: { [productId: number]: boolean } = {};
  loadProducts(){
    this.products$ = this.productService.getProducts();

  }
  ngOnInit() {
    this.loadProducts();
  }

  editProduct(id:number){
  this.router.navigate(['/admin/edit-product',id]);
  }

  deleteProduct(id:number){
    Swal.fire({
      title: "Are you sure you want to delete this product ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if(result.isConfirmed){
        this.productService.deleteProduct(id).subscribe({ 
          next:(response)=>{
            Swal.fire('Deleted!', 'The product has been deleted.', 'success');
            this.loadProducts();
          },error:(error)=>{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.error?.message || 'An error occurred while deleting!'
            });
          }
        }
        );

      }
    })     
  }
  addProduct(){
    this.router.navigate(['/admin/add-product']);
  }

  goBack(){
    this.location.back();
  }

  addProductUnitsale(id:number){
    this.router.navigate(['/admin/productUnitSale/add-productUnitSale-with-product-varaint-id',id]);
  }
  
  addProductVariant(id:number){
    this.router.navigate(['/admin/productVariant/add-productVariant-with-productId',id]);
  }

  hasVariants(productId: number) {
    this.productVariantService.hasProductVariants(productId).subscribe({
      next:(response) =>{
        this.condition = response.hasVariants
        if(this.condition){
              this.productVariantList(productId);
      }else{
        console.log("This product has no variants !");
        this.showMessage = true;
        this.message= "This product has no variants !";
        setTimeout(() => {
          this.showMessage = false;
        }, 3000);
      }
      },
      error:(err) =>{
        alert("Error checking product variants"+ err.error?.message);
        console.error('Error checking product variants', err);
      }
    }); 
  }
  productVariantList(id:number){
    this.router.navigate(['/admin/productVariant/productVariant-list-with-productId',id]);
  }



  addCharacteristicValue(){
    this.router.navigate(['/admin/characteristicValue/add-characteristicValue']);
  }

  addCharacteristic(id:number){
    this.router.navigate(['/admin/characteristic/add-characteristic-with-productId',id]);
  }



  findProductUnitSale(id: number) {
    this.router.navigate(['/admin/productUnitSale/productUnitSale-list-with-productId', id]);
  }

}
