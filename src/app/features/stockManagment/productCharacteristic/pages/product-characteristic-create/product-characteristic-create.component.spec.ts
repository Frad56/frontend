import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCharacteristicCreateComponent } from './product-characteristic-create.component';

describe('ProductCharacteristicCreateComponent', () => {
  let component: ProductCharacteristicCreateComponent;
  let fixture: ComponentFixture<ProductCharacteristicCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCharacteristicCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductCharacteristicCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
