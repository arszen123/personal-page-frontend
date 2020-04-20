import { TestBed } from '@angular/core/testing';

import { PublicProfileService } from './public-profile.service';

describe('PublicProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublicProfileService = TestBed.get(PublicProfileService);
    expect(service).toBeTruthy();
  });
});
