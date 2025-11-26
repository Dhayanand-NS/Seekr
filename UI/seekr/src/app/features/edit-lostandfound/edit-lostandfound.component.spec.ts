import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLostandfoundComponent } from './edit-lostandfound.component';

describe('EditLostandfoundComponent', () => {
  let component: EditLostandfoundComponent;
  let fixture: ComponentFixture<EditLostandfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLostandfoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLostandfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
