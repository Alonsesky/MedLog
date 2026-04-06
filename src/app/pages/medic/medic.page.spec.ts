import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicPage } from './medic.page';

describe('MedicPage', () => {
  let component: MedicPage;
  let fixture: ComponentFixture<MedicPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
