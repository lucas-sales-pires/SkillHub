import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EscolhaPage } from './escolha.page';

describe('EscolhaPage', () => {
  let component: EscolhaPage;
  let fixture: ComponentFixture<EscolhaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EscolhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
