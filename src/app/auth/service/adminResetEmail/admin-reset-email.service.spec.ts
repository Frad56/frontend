import { TestBed } from '@angular/core/testing';

import { AdminResetEmailService } from './admin-reset-email.service';

describe('AdminResetEmailService', () => {
  let service: AdminResetEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminResetEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
