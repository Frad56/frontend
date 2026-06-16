import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductSupplierComponent } from './create-product-supplier.component';

describe('CreateProductSupplierComponent', () => {
  let component: CreateProductSupplierComponent;
  let fixture: ComponentFixture<CreateProductSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProductSupplierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateProductSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
