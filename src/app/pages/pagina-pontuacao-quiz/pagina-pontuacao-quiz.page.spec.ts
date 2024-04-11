import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaPontuacaoQuizPage } from './pagina-pontuacao-quiz.page';

describe('PaginaPontuacaoQuizPage', () => {
  let component: PaginaPontuacaoQuizPage;
  let fixture: ComponentFixture<PaginaPontuacaoQuizPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaginaPontuacaoQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
