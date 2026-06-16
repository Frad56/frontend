import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Characteristic } from '../../../../../shared/models/StockManagment/Characteristic.model';
import { CharacteristicService } from '../../../../../core/services/stockManagement/characteristicService/characteristic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-characteristic-list',
  standalone: true,
  imports: [CommonModule
    ,MatTableModule,
     MatCardModule,
     MatIconModule,
     MatButtonModule],
  templateUrl: './characteristic-list.component.html',
  styleUrl: './characteristic-list.component.css'
})
export class CharacteristicListComponent implements OnInit {


protected characteristics$!:Observable<Characteristic[]>;
displayedColumns: string[] = ['characteristicId', 'name', 'type','actions'];
private router = inject(Router);
private characteristicService = inject(CharacteristicService);
private location = inject(Location);



 loadCharacteristics(){
  this.characteristics$ = this.characteristicService.getCharacteristic();
}
ngOnInit(): void {
  this.loadCharacteristics();
}

deleteCharacteristic(id:number){
  Swal.fire({
    title: "Are you sure you want to delete this Characteristicduct ?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
  }).then((result) => {
    if(result.isConfirmed){
      this.characteristicService.deleteCharacteristic(id).subscribe({
        next:(response)=>{
          Swal.fire('Deleted!', 'The Characteristic has been deleted.', 'success');
          this.loadCharacteristics();
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
addCharacteristic(){
  this.router.navigate(['admin/characteristic/add-characteristic']);
 }
editCharacteristic(id:number){
  this.router.navigate(['admin/characteristic/edit-characteristic',id]);
 }
goBack(){
  this.location.back();
}
}
