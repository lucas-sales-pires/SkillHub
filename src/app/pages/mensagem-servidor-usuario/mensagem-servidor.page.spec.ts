import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MensagemServidorPage } from './mensagem-servidor.page';

describe('MensagemServidorPage', () => {
  let component: MensagemServidorPage;
  let fixture: ComponentFixture<MensagemServidorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MensagemServidorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
