import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductSupplierComponent } from './list-product-supplier.component';

describe('ListProductSupplierComponent', () => {
  let component: ListProductSupplierComponent;
  let fixture: ComponentFixture<ListProductSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProductSupplierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListProductSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
