import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagasinerDashboardComponent } from './magasiner-dashboard.component';

describe('MagasinerDashboardComponent', () => {
  let component: MagasinerDashboardComponent;
  let fixture: ComponentFixture<MagasinerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagasinerDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MagasinerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
