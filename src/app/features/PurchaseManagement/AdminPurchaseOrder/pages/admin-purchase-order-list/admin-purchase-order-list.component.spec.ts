import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPurchaseOrderListComponent } from './admin-purchase-order-list.component';

describe('AdminPurchaseOrderListComponent', () => {
  let component: AdminPurchaseOrderListComponent;
  let fixture: ComponentFixture<AdminPurchaseOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPurchaseOrderListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPurchaseOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
