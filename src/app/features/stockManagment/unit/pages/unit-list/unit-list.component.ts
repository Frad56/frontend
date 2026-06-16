import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Unit } from '../../../../../shared/models/StockManagment/Unit.model';
import { UnitService } from '../../../../../core/services/stockManagement/unitService/unit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unit-list',
  standalone: true,
  imports: [CommonModule
    ,MatTableModule,
     MatCardModule,
     MatIconModule,
     MatButtonModule],
  templateUrl: './unit-list.component.html',
  styleUrl: './unit-list.component.css'
})
export class UnitListComponent implements OnInit {
units$!:Observable<Unit[]>;
displayedColumns: string[] = ['unitId', 'name', 'symbol', 'actions'];
private unitService = inject(UnitService);
private router = inject(Router);
private location = inject(Location);
loadUnits(){
  this.units$ = this.unitService.getUnits();
}
ngOnInit(): void {
    this.loadUnits();
}
editUnit(id:number){
this.router.navigate(['admin/unit/edit-unit',id]);
}


deleteUnit(id:number){
  Swal.fire({
    title: "Are you sure you want to delete this Unit ?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
  }).then((result) => {
    if(result.isConfirmed){
      this.unitService.deleteUnit(id).subscribe({ 
        next:(response)=>{
          Swal.fire('Deleted!', 'The unit has been deleted.', 'success');
          this.loadUnits();
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
addUnit(){
  this.router.navigate(['admin/unit/add-unit']);
 }
 goBack(){
  this.location.back();
}
}
