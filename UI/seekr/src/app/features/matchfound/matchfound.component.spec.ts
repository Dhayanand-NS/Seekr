import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchfoundComponent } from './matchfound.component';

describe('MatchfoundComponent', () => {
  let component: MatchfoundComponent;
  let fixture: ComponentFixture<MatchfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchfoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
