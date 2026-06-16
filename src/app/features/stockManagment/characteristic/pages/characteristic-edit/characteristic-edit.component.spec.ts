import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteristicEditComponent } from './characteristic-edit.component';

describe('CharacteristicEditComponent', () => {
  let component: CharacteristicEditComponent;
  let fixture: ComponentFixture<CharacteristicEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacteristicEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacteristicEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
