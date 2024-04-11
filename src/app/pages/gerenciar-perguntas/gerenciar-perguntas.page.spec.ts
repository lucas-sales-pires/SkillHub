import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GerenciarPerguntasPage } from './gerenciar-perguntas.page';

describe('GerenciarPerguntasPage', () => {
  let component: GerenciarPerguntasPage;
  let fixture: ComponentFixture<GerenciarPerguntasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GerenciarPerguntasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
