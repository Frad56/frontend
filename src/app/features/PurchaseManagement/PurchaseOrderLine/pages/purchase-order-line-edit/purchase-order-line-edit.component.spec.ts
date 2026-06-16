import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderLineEditComponent } from './purchase-order-line-edit.component';

describe('PurchaseOrderLineEditComponent', () => {
  let component: PurchaseOrderLineEditComponent;
  let fixture: ComponentFixture<PurchaseOrderLineEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOrderLineEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseOrderLineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
