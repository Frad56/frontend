import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalesOrderListComponent } from './edit-sales-order-list.component';

describe('EditSalesOrderListComponent', () => {
  let component: EditSalesOrderListComponent;
  let fixture: ComponentFixture<EditSalesOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSalesOrderListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSalesOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
