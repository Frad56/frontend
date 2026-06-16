import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteristicValueEditComponent } from './characteristic-value-edit.component';

describe('CharacteristicValueEditComponent', () => {
  let component: CharacteristicValueEditComponent;
  let fixture: ComponentFixture<CharacteristicValueEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacteristicValueEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacteristicValueEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
