import { Component, inject } from '@angular/core';
import { SalesOrderLineService } from '../../../core/services/salesManagement/salesOrderLine/sales-order-line.service';
import { Observable } from 'rxjs';
import { SalesOrderLine } from '../../../shared/models/salesManagement/SalesOrderLine.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

import Swal from 'sweetalert2';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CharacteristicValueService } from '../../../core/services/stockManagement/CharacteristicValueService/characteristic-value.service';
import { CharacteristicValue } from '../../../shared/models/StockManagment/CharacteristicValue.model';

@Component({
  selector: 'app-edit-sales-order-list',
  standalone: true,
  imports: [CommonModule
    ,MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './edit-sales-order-list.component.html',
  styleUrl: './edit-sales-order-list.component.css'
})
export class EditSalesOrderListComponent {
private salesOrderLineService = inject(SalesOrderLineService);
private characteristicValueService = inject(CharacteristicValueService);
salesOrderLines :SalesOrderLine[] =[];

private router = inject(Router);
private route = inject(ActivatedRoute);
displayedColumns: string[] = [ 'productArticleCode', 'ProductReference', 'ProductDesignation','ProductBrand','ProductChracteristic','quantit','unitPrice','Product_Unit_Sale','discount','total','totalAfterDiscount','actions'];

loadSalesOrderLine(){
  this.id = Number(this.route.snapshot.paramMap.get('id'));
  this.salesOrderLineService.getSalesOrderLineListBySalesOrderId(this.id).subscribe({
    next:(lines)=>{
      this.salesOrderLines=lines;
      lines.forEach(line=>{
        const variantId= line.productVariantId;
        this.characteristicValue(variantId)
      })
    },error:(err)=>{
    console.log('error'+err)
    }

  })
}

characteristicsMap: { [key: number]: Record<string, string> } = {};

characteristicValue(productVariantId:number){
  this.characteristicValueService.findCharacteristicValueListByProductVariantId(productVariantId).subscribe({
    next:(data)=>{
      console.log("CharacteristicValue Appeler");
      this.characteristicsMap[productVariantId]=data;
    },
    error:(err)=>{
      console.log("error : "+ err);
    }
  })
  //findCharacteristicValueListByProductVariantId

}
id!:number;
ngOnInit(){
  this.loadSalesOrderLine();
}

deleteSaleOrderLine(id:number){
  Swal.fire({
    title: "Are you sure you want to delete this Sale Order ?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
  }).then((result) => {
    if(result.isConfirmed){
      this.salesOrderLineService.deleteSalesOrderLine(id).subscribe({
        next:()=>{
          Swal.fire('Deleted!', 'The Sale Order has been deleted.', 'success');
          this.loadSalesOrderLine();
        },
        error:(error)=>{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error?.message || 'An error occurred while deleting!'
          });
        }
      });
      
    }
  })     
}


editSaleOrderLine(id:number){
  this.router.navigate(['/admin/sale/edit-sales-Oder-line',id]);
}


addSaleOrderLine(){
  this.router.navigate(['/admin/client/add-client']);
 }

private location = inject(Location);
goBack(){
  this.location.back();
}
}
