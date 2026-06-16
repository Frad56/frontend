import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderListEditComponent } from './purchase-order-list-edit.component';

describe('PurchaseOrderListEditComponent', () => {
  let component: PurchaseOrderListEditComponent;
  let fixture: ComponentFixture<PurchaseOrderListEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOrderListEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseOrderListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
