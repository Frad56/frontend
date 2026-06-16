import { TestBed } from '@angular/core/testing';

import { ProductUnitPurchaseService } from './product-unit-purchase.service';

describe('ProductUnitPurchaseService', () => {
  let service: ProductUnitPurchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductUnitPurchaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
