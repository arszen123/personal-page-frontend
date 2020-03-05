import { TestBed, async, inject } from '@angular/core/testing';

import { FormNotSavedGuard } from './form-not-saved.guard';

describe('FormNotSavedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormNotSavedGuard]
    });
  });

  it('should ...', inject([FormNotSavedGuard], (guard: FormNotSavedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
