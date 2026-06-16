import { TestBed } from '@angular/core/testing';

import { CharacteristicValueService } from './characteristic-value.service';

describe('CharacteristicValueService', () => {
  let service: CharacteristicValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacteristicValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
