import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteristicCreateComponent } from './characteristic-create.component';

describe('CharacteristicCreateComponent', () => {
  let component: CharacteristicCreateComponent;
  let fixture: ComponentFixture<CharacteristicCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacteristicCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacteristicCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
