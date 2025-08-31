import { TestBed } from '@angular/core/testing';

import { Sidemenu } from './sidemenu';

describe('Sidemenu', () => {
  let service: Sidemenu;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sidemenu);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
