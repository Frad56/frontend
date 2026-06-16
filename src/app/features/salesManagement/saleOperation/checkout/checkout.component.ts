import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaymentType } from '../../../../shared/models/enum/paymentType';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../../../shared/models/salesManagement/cartItem.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,
          FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  @Input() items: CartItem[] = [];

  @Output() orderConfirmed = new EventEmitter<any>();

  paymentType: string = 'CASH';

  confirm() {
    
    const salesOrderLineListDTO = this.items.map(item => ({
      productVariantId: item.productVariantId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      discount: item.discount || 0,
      prductUnitSaleId: item.productUnitSaleId

    }));
    

    this.orderConfirmed.emit({
      paymentType: this.paymentType,
      salesOrderLineListDTO: salesOrderLineListDTO
    });
  }
}
