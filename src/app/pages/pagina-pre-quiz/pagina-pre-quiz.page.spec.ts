import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaPreQuizPage } from './pagina-pre-quiz.page';

describe('PaginaPreQuizPage', () => {
  let component: PaginaPreQuizPage;
  let fixture: ComponentFixture<PaginaPreQuizPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaginaPreQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
