import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVariantEditComponent } from './product-variant-edit.component';

describe('ProductVariantEditComponent', () => {
  let component: ProductVariantEditComponent;
  let fixture: ComponentFixture<ProductVariantEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductVariantEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductVariantEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
