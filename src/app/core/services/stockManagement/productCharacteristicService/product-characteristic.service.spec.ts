import { TestBed } from '@angular/core/testing';

import { ProductCharacteristicService } from './product-characteristic.service';

describe('ProductCharacteristicService', () => {
  let service: ProductCharacteristicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCharacteristicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
