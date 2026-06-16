import { TestBed } from '@angular/core/testing';

import { QuotationLineServiceService } from './quotation-line-service.service';

describe('QuotationLineServiceService', () => {
  let service: QuotationLineServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuotationLineServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
