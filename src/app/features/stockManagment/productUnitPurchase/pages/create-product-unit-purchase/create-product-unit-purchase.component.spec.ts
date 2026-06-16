import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductUnitPurchaseComponent } from './create-product-unit-purchase.component';

describe('CreateProductUnitPurchaseComponent', () => {
  let component: CreateProductUnitPurchaseComponent;
  let fixture: ComponentFixture<CreateProductUnitPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProductUnitPurchaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateProductUnitPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
