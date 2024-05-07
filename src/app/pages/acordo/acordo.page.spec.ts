import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcordoPage } from './acordo.page';

describe('AcordoPage', () => {
  let component: AcordoPage;
  let fixture: ComponentFixture<AcordoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AcordoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
