import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MensagemServidorAdmPage } from './mensagem-servidor-adm.page';

describe('MensagemServidorAdmPage', () => {
  let component: MensagemServidorAdmPage;
  let fixture: ComponentFixture<MensagemServidorAdmPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MensagemServidorAdmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
