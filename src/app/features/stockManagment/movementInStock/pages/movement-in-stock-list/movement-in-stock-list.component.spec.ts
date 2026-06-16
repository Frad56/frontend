import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementInStockListComponent } from './movement-in-stock-list.component';

describe('MovementInStockListComponent', () => {
  let component: MovementInStockListComponent;
  let fixture: ComponentFixture<MovementInStockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovementInStockListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovementInStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
