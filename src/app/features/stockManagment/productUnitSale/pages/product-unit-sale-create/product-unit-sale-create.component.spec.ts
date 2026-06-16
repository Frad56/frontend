import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUnitSaleCreateComponent } from './product-unit-sale-create.component';

describe('ProductUnitSaleCreateComponent', () => {
  let component: ProductUnitSaleCreateComponent;
  let fixture: ComponentFixture<ProductUnitSaleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductUnitSaleCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductUnitSaleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
