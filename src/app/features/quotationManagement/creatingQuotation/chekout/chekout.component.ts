import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../../../shared/models/salesManagement/cartItem.model';

@Component({
  selector: 'app-chekout',
  standalone: true,
  imports: [],
  templateUrl: './chekout.component.html',
  styleUrl: './chekout.component.css'
})
export class ChekoutComponent {

  @Input() items: CartItem[] = [];

  @Output() orderConfirmed = new EventEmitter<any>();
  confirm() {
    const quotationLine =this.items.map(item => ({
      productVariantId: item.productVariantId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      discount: item.discount || 0,
      prductUnitSaleId: item.productUnitSaleId

    }));
    this.orderConfirmed.emit({
      quotationLine: quotationLine
     });
  }

 
}
