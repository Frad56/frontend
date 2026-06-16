import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuotationLineComponent } from './edit-quotation-line.component';

describe('EditQuotationLineComponent', () => {
  let component: EditQuotationLineComponent;
  let fixture: ComponentFixture<EditQuotationLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditQuotationLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditQuotationLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
