import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCharacteristicEditComponent } from './product-characteristic-edit.component';

describe('ProductCharacteristicEditComponent', () => {
  let component: ProductCharacteristicEditComponent;
  let fixture: ComponentFixture<ProductCharacteristicEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCharacteristicEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductCharacteristicEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
