import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListeComponent } from './users-liste.component';

describe('UsersListeComponent', () => {
  let component: UsersListeComponent;
  let fixture: ComponentFixture<UsersListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
