import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteristicValueCreateComponent } from './characteristic-value-create.component';

describe('CharacteristicValueCreateComponent', () => {
  let component: CharacteristicValueCreateComponent;
  let fixture: ComponentFixture<CharacteristicValueCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacteristicValueCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacteristicValueCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
