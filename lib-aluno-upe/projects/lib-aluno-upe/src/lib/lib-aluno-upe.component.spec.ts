import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibAlunoUpeComponent } from './lib-aluno-upe.component';

describe('LibAlunoUpeComponent', () => {
  let component: LibAlunoUpeComponent;
  let fixture: ComponentFixture<LibAlunoUpeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibAlunoUpeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibAlunoUpeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
