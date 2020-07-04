import { TestBed } from '@angular/core/testing';

import { LibAlunoUpeService } from './lib-aluno-upe.service';

describe('LibAlunoUpeService', () => {
  let service: LibAlunoUpeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibAlunoUpeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
