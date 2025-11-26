import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostandfoundListComponent } from './lostandfound-list.component';

describe('LostandfoundListComponent', () => {
  let component: LostandfoundListComponent;
  let fixture: ComponentFixture<LostandfoundListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LostandfoundListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LostandfoundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
