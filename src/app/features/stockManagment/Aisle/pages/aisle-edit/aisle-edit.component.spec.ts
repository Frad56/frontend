import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AisleEditComponent } from './aisle-edit.component';

describe('AisleEditComponent', () => {
  let component: AisleEditComponent;
  let fixture: ComponentFixture<AisleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AisleEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AisleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
