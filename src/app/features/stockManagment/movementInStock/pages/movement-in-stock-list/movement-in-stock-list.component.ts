import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MovementInStockService } from '../../../../../core/services/stockManagement/movementInStockService/movement-in-stock.service';
import { MovementInStock } from '../../../../../shared/models/StockManagment/MovementInStock.model';
@Component({
  selector: 'app-movement-in-stock-list',
  standalone: true,
  imports: [CommonModule
    ,MatTableModule,
     MatCardModule,
     MatIconModule,
     MatButtonModule],
  templateUrl: './movement-in-stock-list.component.html',
  styleUrl: './movement-in-stock-list.component.css'
})
export class MovementInStockListComponent implements OnInit{

private location = inject(Location);
private router = inject(Router);
private movmentInStockServie = inject(MovementInStockService);

movmentInStockList$!:Observable<MovementInStock[]>;
displayedColumns: string[] = ['date', 'movementInStockType','productVariantCode', 'quantity','unitName'];

loadMovmentInStock(){
  this.movmentInStockList$ = this.movmentInStockServie.getMovementInStockList();
}

ngOnInit(): void {
    this.loadMovmentInStock();
}

addMovmentInStock(){
  this.router.navigate(['movementInStock/add-movementInStock']);
}

editMovmentInStock(id:number){
  this.router.navigate(['movementInStock/edit-movementInStock',id]);
}

deleteMovmentInStock(id:number){
    this.movmentInStockServie.deleteMovementInStock(id).subscribe(res => {
      alert("Movment In Stock Value Deleted !");
      this.loadMovmentInStock();
    });
  }

  goBack(){
    this.location.back();
  }
}
