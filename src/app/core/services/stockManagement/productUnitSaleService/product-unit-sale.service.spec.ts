import { TestBed } from '@angular/core/testing';

import { ProductUnitSaleService } from './product-unit-sale.service';

describe('ProductUnitSaleService', () => {
  let service: ProductUnitSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductUnitSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
