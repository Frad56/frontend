import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteristicValueListComponent } from './characteristic-value-list.component';

describe('CharacteristicValueListComponent', () => {
  let component: CharacteristicValueListComponent;
  let fixture: ComponentFixture<CharacteristicValueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacteristicValueListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacteristicValueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
