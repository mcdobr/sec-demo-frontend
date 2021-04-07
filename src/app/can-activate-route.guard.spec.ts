import { TestBed } from '@angular/core/testing';

import { CanActivateRouteGuard } from './can-activate-route.guard';

describe('CanActivateRouteGuardService', () => {
  let service: CanActivateRouteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActivateRouteGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
