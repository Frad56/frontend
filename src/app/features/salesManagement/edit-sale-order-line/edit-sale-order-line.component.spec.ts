import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSaleOrderLineComponent } from './edit-sale-order-line.component';

describe('EditSaleOrderLineComponent', () => {
  let component: EditSaleOrderLineComponent;
  let fixture: ComponentFixture<EditSaleOrderLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSaleOrderLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSaleOrderLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
