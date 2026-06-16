import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVariantSearchByCodeComponent } from './product-variant-search-by-code.component';

describe('ProductVariantSearchByCodeComponent', () => {
  let component: ProductVariantSearchByCodeComponent;
  let fixture: ComponentFixture<ProductVariantSearchByCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductVariantSearchByCodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductVariantSearchByCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
