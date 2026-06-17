import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriagemResultado } from './triagem-resultado';

describe('TriagemResultado', () => {
  let component: TriagemResultado;
  let fixture: ComponentFixture<TriagemResultado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriagemResultado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriagemResultado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
