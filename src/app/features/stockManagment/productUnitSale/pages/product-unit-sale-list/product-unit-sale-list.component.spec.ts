import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUnitSaleListComponent } from './product-unit-sale-list.component';

describe('ProductUnitSaleListComponent', () => {
  let component: ProductUnitSaleListComponent;
  let fixture: ComponentFixture<ProductUnitSaleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductUnitSaleListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductUnitSaleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
