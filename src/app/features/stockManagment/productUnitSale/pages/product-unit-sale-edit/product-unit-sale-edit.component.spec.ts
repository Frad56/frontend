import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUnitSaleEditComponent } from './product-unit-sale-edit.component';

describe('ProductUnitSaleEditComponent', () => {
  let component: ProductUnitSaleEditComponent;
  let fixture: ComponentFixture<ProductUnitSaleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductUnitSaleEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductUnitSaleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
