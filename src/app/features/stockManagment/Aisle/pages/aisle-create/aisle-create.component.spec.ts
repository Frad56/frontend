import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AisleCreateComponent } from './aisle-create.component';

describe('AisleCreateComponent', () => {
  let component: AisleCreateComponent;
  let fixture: ComponentFixture<AisleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AisleCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AisleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
