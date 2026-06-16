import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationLinesComponent } from './quotation-lines.component';

describe('QuotationLinesComponent', () => {
  let component: QuotationLinesComponent;
  let fixture: ComponentFixture<QuotationLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotationLinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuotationLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
