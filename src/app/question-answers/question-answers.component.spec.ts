import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionAnswersComponent } from './question-answers.component';
import { QuestionService } from '../service/question.service';
import { AuthService } from '../service/auth.service';
import { of } from 'rxjs';
import { Question } from '../model/question/question';
import { AnswerArray } from '../model/answer/answer-array';
import { Router } from '@angular/router';

describe('QuestionAnswersComponent', () => {
  let component: QuestionAnswersComponent;
  let fixture: ComponentFixture<QuestionAnswersComponent>;
  let questionServiceMock: any;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    questionServiceMock = jasmine.createSpyObj('QuestionService', ['getQuestionAnswers']);
    authServiceMock = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [QuestionAnswersComponent],
      providers: [
        { provide: QuestionService, useValue: questionServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAnswersComponent);
    component = fixture.componentInstance;
    component.question = { id: 1, title: 'Test Question', body: 'Test Content' } as Question;
    fixture.detectChanges();
  });

  it('should load question answers', () => {
    const mockAnswers: AnswerArray = [{ id: 1, body: 'Test Answer', createdAt: new Date(), updatedAt: new Date(), userId: 1, questionId: 1 } as any];
    questionServiceMock.getQuestionAnswers.and.returnValue(of(mockAnswers));

    component.getQuestionAnswers(component.question);

    expect(questionServiceMock.getQuestionAnswers).toHaveBeenCalledWith(1);
    expect(component.answers).toEqual(mockAnswers);
  });

  it('should set isLoggedIn to true when user is logged in', () => {
    authServiceMock.isLoggedIn.and.returnValue(of(true));

    component.ngOnInit();

    expect(component.isLoggedIn).toBeTrue();
  });

  it('should set isLoggedIn to false when user is not logged in', () => {
    authServiceMock.isLoggedIn.and.returnValue(of(false));

    component.ngOnInit();

    expect(component.isLoggedIn).toBeFalse();
  });
});
