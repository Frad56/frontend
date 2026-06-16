import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../../../../../../shared/models/BusinessPartner/SupplierManagement/Suplier.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SupplierService } from '../../../../../../core/services/BusinessPartnerManagement/supplierManagement/supplier.service';

@Component({
  selector: 'app-list-supplier',
  standalone: true,
  imports: [CommonModule
           ,MatTableModule,
           MatCardModule,
           MatIconModule,
           MatButtonModule],
  templateUrl: './list-supplier.component.html',
  styleUrl: './list-supplier.component.css'
})
export class ListSupplierComponent  implements OnInit {

  private supplierService = inject(SupplierService);
  private location = inject(Location);
  displayedColumns: string[] = ['companyName', 'contactName', 'phoneNumber', 'fax', 'email','address','city','postalCode','country','actions'];

  suppliers$!  : Observable<Supplier[]>;
  private router = inject(Router);

  loadSuppliers(){
    this.suppliers$ = this.supplierService.getSuppliers();

  }
  ngOnInit(): void {
    this.loadSuppliers();
  }

  editSupplier(id:number){
    this.router.navigate(['/admin/suppliers/edit-supplier',id]);
  }
  
  
  deleteSupplier(id:number){
    this.supplierService.deleteSupplier(id).subscribe(res => {
      alert("Supplier Deleted !");
      this.loadSuppliers();
      });
    
    }


    addSupplier(){
      this.router.navigate(['/admin/suppliers/add-supplier']);
     }
    goBack(){
      this.location.back();
    }


}
