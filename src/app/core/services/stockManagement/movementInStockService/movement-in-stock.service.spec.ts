import { TestBed } from '@angular/core/testing';

import { MovementInStockService } from './movement-in-stock.service';

describe('MovementInStockService', () => {
  let service: MovementInStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovementInStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
