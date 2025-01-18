import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyquestionPageComponent } from './myquestion-page.component';

describe('MyquestionPageComponent', () => {
  let component: MyquestionPageComponent;
  let fixture: ComponentFixture<MyquestionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyquestionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyquestionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
