import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUnitPurchaseListComponent } from './product-unit-purchase-list.component';

describe('ProductUnitPurchaseListComponent', () => {
  let component: ProductUnitPurchaseListComponent;
  let fixture: ComponentFixture<ProductUnitPurchaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductUnitPurchaseListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductUnitPurchaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
