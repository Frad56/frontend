import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { CharacteristicValue } from '../../../../../shared/models/StockManagment/CharacteristicValue.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CharacteristicValueService } from '../../../../../core/services/stockManagement/CharacteristicValueService/characteristic-value.service';

@Component({
  selector: 'app-characteristic-value-list',
  standalone: true,
  imports: [CommonModule
    ,MatTableModule,
     MatCardModule,
     MatIconModule,
     MatButtonModule],
  templateUrl: './characteristic-value-list.component.html',
  styleUrl: './characteristic-value-list.component.css'
})
export class CharacteristicValueListComponent implements OnInit {

  characteristicValueList$!:Observable<CharacteristicValue[]>;
  displayedColumns: string[] = ['characteristicValueId', 'productReference', 'productVariantCode', 'value', 'actions'];

  private router = inject(Router);
  private location = inject(Location);
  private characteristicValueService = inject(CharacteristicValueService);


  loadCharacteristicValue(){
    this.characteristicValueList$ = this.characteristicValueService.getAllCharacteristicValue();
  }
  ngOnInit(): void {
      this.loadCharacteristicValue();
  }

  editCharacteristicValue(id:number){
    this.router.navigate(['characteristicValue/edit-characteristicValue',id]);
    }
  
  
    deleteCharacteristicValue(id:number){
      this.characteristicValueService.deleteCharacteristicValue(id).subscribe(res => {
        alert("Characteristic Value Deleted !");
        this.loadCharacteristicValue();
      });
    
    }
    addCharacteristicValue(){
      this.router.navigate(['characteristicValue/add-characteristicValue']);
    }
  
    goBack(){
      this.location.back();
    }
  

}
