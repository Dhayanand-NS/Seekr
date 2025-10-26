import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostandfoudComponent } from './lostandfoud.component';

describe('LostandfoudComponent', () => {
  let component: LostandfoudComponent;
  let fixture: ComponentFixture<LostandfoudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LostandfoudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LostandfoudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
