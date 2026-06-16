import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { AdminResetEmailService } from '../../../../auth/service/adminResetEmail/admin-reset-email.service';
import { AuthService } from '../../../../auth/service/auth.service';
import { CategoryMenuComponent } from "../../../stockManagment/category/category-menu/category-menu.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';




@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatSidenavModule,
    MatButtonModule, CommonModule, RouterOutlet, CategoryMenuComponent, MatIconModule,
    RouterLink,ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})


export class AdminComponent {

  private dialog = inject(MatDialog);
  private adminResetEmailService = inject(AdminResetEmailService);
  private authService = inject(AuthService);
  router = inject(Router);


  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showCategoryMenu = false;
      }
    });
    const isEmailChanged = this.authService.getIsEmailChanged();
    console.log('isEmailChanged:', isEmailChanged);
    if (isEmailChanged  === 'false' && localStorage.getItem('role') === 'ADMIN') {
      alert(isEmailChanged)
      this.openChangeEmailDialog();
    }
  }
  openChangeEmailDialog() {
    const dialogRef = this.dialog.open(ChangeEmailComponent, {
      width: '400px',
      disableClose: true 
    });
  
    dialogRef.afterClosed().subscribe(() => {
      localStorage.setItem('isFirstLogin', 'true');
    });
  }





  // ── Sidebar visibility ──────────────────────
  sidebarHidden = false;
 
  toggleSidebar(): void {
    this.sidebarHidden = !this.sidebarHidden;
    // SB Admin toggle class on body (optional, pour le CSS responsive)
    document.body.classList.toggle('sb-sidenav-toggled');
  }
 
  // ── Logged-in user display ──────────────────
  currentUser = 'Admin';   // remplacer par votre service d'auth
 
  // ── Category menu (conservé de l'ancien code) ──
  showCategoryMenu = false;
 //* ****************   SignUP    ************************** */
signUp(){this.router.navigate(['/admin/add-user']);}


//////////////////// Stock Managment ////////////////////////
//Products
 getProducts(){ this.router.navigate(['/admin/products']);}
 
 getCategory(){this.router.navigate(['/admin/category/menu']);}
//

 addProduct(){
  this.router.navigate(['/admin/add-product']);
 }


 //add Product Supplier 
  addProductSupplier(){
    this.router.navigate(['/admin/product-suppliers/add-product-supplier']);
  }

 //Categorys
 addCategory(){
  this.router.navigate(['/admin/categorys/add-category']);
 }


 //Stocks

 addStock(){
  this.router.navigate(['/admin/stock/add-stock']);
 }

 ////////////////////////// supplier managment /////////////////////////////
 addSupplier(){
  this.router.navigate(['/admin/suppliers/add-supplier']);
 }
 allSuppliers(){
  this.router.navigate(['/admin/suppliers/suppliers']);
 }

 ////////////ClientManagment
 addClient(){
  this.router.navigate(['/admin/client/add-client']);
 }
 allClients(){
  this.router.navigate(['/admin/client/client-all']);
 }
  ////////////////////////// Aisle managment /////////////////////////////
  addAisle(){
    this.router.navigate(['/admin/aisle/add-aisle']);
   }
   allAisle(){
    this.router.navigate(['/admin/aisle/list-aisle']);
   }

 
   ////////////////////////// Characteristic managment /////////////////////////////

   addCharacteristic(){
    this.router.navigate(['/admin/characteristic/add-characteristic']);

   }
   allCharacteristic(){
    this.router.navigate(['/admin/characteristic/characteristic-list']);

   }
    ////////////////////////// Unit managment /////////////////////////////

    addUnit(){
      this.router.navigate(['/admin/unit/add-unit']);
  
     }
     allUnits(){
      this.router.navigate(['/admin/unit/unit-list']);
     }
    /////////////////////    ProductUnitsale  Managment                  ///////////////////////////////
    addProductUnitsale(){
      this.router.navigate(['/admin/productUnitSale/add-productUnitSale']);
  
     }
     allProductUnitsale(){
      this.router.navigate(['/admin/productUnitSale/productUnitSale-list']);
  
     }

     
     ////////////////////   ProductVariantManagment ///////////////////////////
     addProductVariant(){
      this.router.navigate(['/admin/productVariant/add-productVariant']);
  
     }
     allProductVariant(){
      this.router.navigate(['/admin/productVariant/productVariant-list']);
  
     }

      ////////////////////   Characteristic Value Managment ///////////////////////////
      addCharacteristicValue(){
        this.router.navigate(['/admin/characteristicValue/add-characteristicValue']);
    
       }
       allCharacteristicValue(){
        this.router.navigate(['/admin/characteristicValue/characteristicValue-list']);
    
       }

          ////////////////////   Movment In Stock Managment ///////////////////////////

      addMovmentInStock(){
        this.router.navigate(['/admin/movementInStock/add-movementInStock']);
    
      }
      allMovmentInStock(){
        this.router.navigate(['/admin/movementInStock/movementInStock-list']);
    
      }
      NotDeliveredPurchaseOrders(){
        this.router.navigate(['/admin/purchase-order/not-delivered-purchase-orders']);
      }

      addSale(){
        this.router.navigate(['/admin/sale/sales']);
      }

      salesOrderList(){
        this.router.navigate(['/admin/sale/sales-list']);

      }
      addQuatation(){
        this.router.navigate(['/admin/quotation/add']);
      }
  
    quatationList(){
      this.router.navigate(['/admin/quotation/list']);
    }
      addPurchaseOrder(){
        this.router.navigate(['/admin/purchase-order/add-purchase-order']);

      }
      showMenu = false;
      seeButtons(){
        this.showMenu = !this.showMenu;
      }

      changePassword(){
        this.router.navigate(['/admin/adminChangePassword']);
      }
      logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('isFirstLogin');
        this.router.navigate(['/login']);
      }





      // ── Menu Search ──────────────────────────────────────────
searchQuery =new FormControl('');
searchResults: { id: string; label: string; path: string; icon: string; action: () => void }[] = [];

private menuItems = [
  { id: 'products',       label: 'Products List',           path: 'Stock > Product Management',   icon: 'fa-list',            action: () => this.getProducts() },
  { id: 'category',       label: 'Category List',           path: 'Stock > Category Management',  icon: 'fa-tags',            action: () => this.getCategory() },
  { id: 'prod-supplier',  label: 'Add Product Supplier',    path: 'Stock Management',              icon: 'fa-truck-loading',   action: () => this.addProductSupplier() },
  { id: 'char-add',       label: 'Add Characteristic',      path: 'Stock > Characteristic',       icon: 'fa-plus',            action: () => this.addCharacteristic() },
  { id: 'char-list',      label: 'Characteristic List',     path: 'Stock > Characteristic',       icon: 'fa-sliders-h',       action: () => this.allCharacteristic() },
  { id: 'aisle-add',      label: 'Add Aisle',               path: 'Stock > Aisle Management',     icon: 'fa-plus',            action: () => this.addAisle() },
  { id: 'aisle-list',     label: 'Aisle List',              path: 'Stock > Aisle Management',     icon: 'fa-th',              action: () => this.allAisle() },
  { id: 'unit-add',       label: 'Add Unit',                path: 'Stock > Unit Management',      icon: 'fa-plus',            action: () => this.addUnit() },
  { id: 'unit-list',      label: 'All Units',               path: 'Stock > Unit Management',      icon: 'fa-balance-scale',   action: () => this.allUnits() },
  { id: 'variant-add',    label: 'Add Product Variant',     path: 'Stock > Product Variant',      icon: 'fa-plus',            action: () => this.addProductVariant() },
  { id: 'variant-list',   label: 'All Product Variants',    path: 'Stock > Product Variant',      icon: 'fa-layer-group',     action: () => this.allProductVariant() },
  { id: 'add-user',       label: 'Add User',                path: 'Users',                        icon: 'fa-user-plus',       action: () => this.signUp() },
  { id: 'add-supplier',   label: 'Add Supplier',            path: 'Suppliers',                    icon: 'fa-plus',            action: () => this.addSupplier() },
  { id: 'all-suppliers',  label: 'All Suppliers',           path: 'Suppliers',                    icon: 'fa-truck',           action: () => this.allSuppliers() },
  { id: 'add-client',     label: 'Add Client',              path: 'Clients',                      icon: 'fa-user-plus',       action: () => this.addClient() },
  { id: 'all-clients',    label: 'All Clients',             path: 'Clients',                      icon: 'fa-list',            action: () => this.allClients() },
  { id: 'add-purchase',   label: 'Add Purchase Operation',  path: 'Movements',                    icon: 'fa-file-invoice',    action: () => this.addPurchaseOrder() },
  { id: 'purchase-list',  label: 'Purchase Operation List', path: 'Movements',                    icon: 'fa-list',            action: () => this.NotDeliveredPurchaseOrders() },
  { id: 'add-sale',       label: 'Add Sale',                path: 'Movements',                    icon: 'fa-cash-register',   action: () => this.addSale() },
  { id: 'sales-list',     label: 'Sales List',              path: 'Movements',                    icon: 'fa-receipt',         action: () => this.salesOrderList() },
  { id: 'stock-mvt',      label: 'Stock Movement List',     path: 'Movements',                    icon: 'fa-warehouse',       action: () => this.allMovmentInStock() },
];

//donner la string contenue dans le FormControl
onSearch(): void {
  const contenue = (this.searchQuery.value ?? '').toLowerCase().trim();
  if (!contenue) { this.searchResults = []; return; }
  this.searchResults = this.menuItems.filter(m =>
    m.label.toLowerCase().includes(contenue) || m.path.toLowerCase().includes(contenue)
  );
}

navigateTo(item: typeof this.menuItems[0]): void {
  this.searchQuery.setValue('');
  this.searchResults = [];
  item.action();           // navigue vers la route
  this.highlightMenuItem(item.id);
}

clearSearch(): void {
  this.searchQuery.setValue('');
  this.searchResults = [];
}

private highlightMenuItem(id: string): void {
  // Retire l'ancien highlight
  document.querySelectorAll('.menu-highlighted').forEach(el => {
    el.classList.remove('menu-highlighted');
    el.querySelector('.arrow-indicator')?.remove();
  });

  setTimeout(() => {
    const el = document.getElementById('menu-item-' + id);
    if (!el) return;
    el.classList.add('menu-highlighted');

    const arrow = document.createElement('span');
    arrow.className = 'arrow-indicator';
    arrow.textContent = '◀';
    el.style.position = 'relative';
    el.appendChild(arrow);

    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Retire le highlight après 3.5 secondes
    setTimeout(() => {
      el.classList.remove('menu-highlighted');
      arrow.remove();
    }, 3500);
  }, 100);
}
}
