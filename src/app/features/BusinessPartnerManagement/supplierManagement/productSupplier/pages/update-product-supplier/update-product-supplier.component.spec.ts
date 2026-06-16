import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductSupplierComponent } from './update-product-supplier.component';

describe('UpdateProductSupplierComponent', () => {
  let component: UpdateProductSupplierComponent;
  let fixture: ComponentFixture<UpdateProductSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProductSupplierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateProductSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
