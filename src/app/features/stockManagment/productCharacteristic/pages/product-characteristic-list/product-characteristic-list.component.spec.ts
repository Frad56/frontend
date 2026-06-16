import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCharacteristicListComponent } from './product-characteristic-list.component';

describe('ProductCharacteristicListComponent', () => {
  let component: ProductCharacteristicListComponent;
  let fixture: ComponentFixture<ProductCharacteristicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCharacteristicListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductCharacteristicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
