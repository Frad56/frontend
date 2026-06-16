import { Component, inject } from '@angular/core';
import { QuotationService } from '../../../../core/services/quotationManagement/quotationService/quotation.service';
import { Observable } from 'rxjs';
import { Quotation } from '../../../../shared/models/quotationManagement/Quotation.dto';
import Swal from 'sweetalert2';
import {  CommonModule, Location } from '@angular/common';

import { ProductVariantSearchByCodeComponent } from '../../../salesManagement/saleOperation/product-variant-search-by-code/product-variant-search-by-code.component';
import { CartComponent } from '../../../salesManagement/saleOperation/cart/cart.component';
import { SearchClientComponent } from '../../../salesManagement/saleOperation/search-client/search-client.component';
import { ChekoutComponent } from '../chekout/chekout.component';
import { CartItem } from '../../../../shared/models/salesManagement/cartItem.model';
import { Client } from '../../../../shared/models/BusinessPartner/ClientManagement/Client.model';
import { ProductVariant } from '../../../../shared/models/StockManagment/ProductVariant.model';
import { QuotationLine } from '../../../../shared/models/quotationManagement/QuotationLine.dto';
import { CheckoutComponent } from "../../../salesManagement/saleOperation/checkout/checkout.component";

@Component({
  selector: 'app-create-quotation',
  standalone: true,
  imports: [ProductVariantSearchByCodeComponent,
    CartComponent, ChekoutComponent,
    SearchClientComponent, CommonModule],
  templateUrl: './create-quotation.component.html',
  styleUrl: './create-quotation.component.css'
})
export class CreateQuotationComponent {

  cartItems: CartItem[] = [];
  selectedClient: Client | null = null;
  private quotationService = inject(QuotationService);

  onClientSelected(client: Client) {
    this.selectedClient = client;
  }
  removeSelectedClient() {
    this.selectedClient = null;
  }


  addProduct(product: ProductVariant) {

    let existing = this.cartItems.find(
      p => p.productVariantId === product.productVariantId
    );
  
    // produit déjà dans panier
    if (existing) {
      if (existing.quantity < existing.quantityInStock) {
        
        existing.quantity++;
        this.cartItems = [...this.cartItems]; 
  
      } else {
  
        Swal.fire({
          icon: 'warning',
          title: 'Insufficient Stock',
          text: 'Maximum stock quantity reached.',
          confirmButtonColor: '#f59e0b'
        });
        return;
      }
  
    } else {
  
      const stock = product.quantityInStock ?? 0;
      if (stock <= 0) {
  
        Swal.fire({
          icon: 'warning',
          title: 'Insufficient Stock',
          text: 'Maximum stock quantity reached.',
          confirmButtonColor: '#f59e0b'
        });
        return;
      }
  

    this.cartItems = [...this.cartItems, {
      productVariantId: product.productVariantId!,
      code: product.code!,
      unitPrice: product.specificPrice!,
      quantity: 1,
      quantityInStock: product.quantityInStock!,
      discount: 0,
   
    }];

  }
  }
  updateCart(items: CartItem[]) {
    this.cartItems = items;
  }

  mapToQuotationLine(): QuotationLine[] {
    return this.cartItems.map(item => ({
      productVariantId: item.productVariantId,
      quantity: item.quantity,
      productUnitSaleId: item.productUnitSaleId,
      unitPrice:item.unitPrice,
      discount: item.discount,
    }));
  }

  confirmOrder(data: any) {
    console.log("=========================================================");
    console.log("consulter cartItems:", JSON.stringify(this.cartItems));
    console.log("=========================================================");
    const order: Quotation = {
      clientId: this.selectedClient?.clientId,
      quotationLineListDTO: this.mapToQuotationLine()
    };
    console.log("Quotation SENT:", order);
  
    console.log("=========================================================");
    console.log("consulter order:", order);
    this.quotationService.addQuotation(order).subscribe({
      next: () => {
        alert("Quotation validée !");
        this.cartItems = [];
        this.selectedClient = null; 
      },
      error: (err) => {
        console.error(err);
        console.log(err.error);
        console.log(err.status);
        console.log(err.message);
      }
    });
  }

private location = inject(Location);
goBack(){
  this.location.back();
}
}
