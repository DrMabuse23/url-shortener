import { TestBed } from '@angular/core/testing';

import { UrlShortenerService } from './url-shortener.service';

describe('UrlShortenerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrlShortenerService = TestBed.get(UrlShortenerService);
    expect(service).toBeTruthy();
  });
});
