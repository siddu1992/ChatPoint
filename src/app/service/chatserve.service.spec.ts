import { TestBed } from '@angular/core/testing';

import { ChatserveService } from './chatserve.service';

describe('ChatserveService', () => {
  let service: ChatserveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatserveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
