import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVariantCreateComponent } from './product-variant-create.component';

describe('ProductVariantCreateComponent', () => {
  let component: ProductVariantCreateComponent;
  let fixture: ComponentFixture<ProductVariantCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductVariantCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductVariantCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
