import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../model/question/question';
import { CreateQuestion } from '../model/question/create-question';
import { QuestionArray } from '../model/question/question-array';
import { AnswerArray } from '../model/answer/answer-array';
import { CreateAnswer } from '../model/answer/create-answer';
import { Answer } from '../model/answer/answer';
import { UpdateQuestion } from '../model/question/update-question';
import { AuthService } from './auth.service';

export enum SortEnum {
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  httpClient: HttpClient;
  authService: AuthService;

  constructor(httpClient: HttpClient, authService: AuthService) {
    this.httpClient = httpClient;
    this.authService = authService;
  }

  private getHeaderWithToken(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  public getQuestion(questionId: number): Observable<Question> {
    return this.httpClient.get<Question>(`http://localhost:8080/questions/${questionId}`);
  }

  public createQuestion(CreateQuestion: CreateQuestion): Observable<Question> {
    const headers = this.getHeaderWithToken();
    return this.httpClient.post<Question>(`http://localhost:8080/questions`, CreateQuestion, { headers });
  }

  public deleteQuestion(questionId: number): Observable<void> {
    const headers = this.getHeaderWithToken();
    return this.httpClient.delete<void>(`http://localhost:8080/questions/${questionId}`, { headers });
  }

  public searchQuestions(searchQuery: string, sort: string): Observable<QuestionArray> {
    return this.httpClient.get<QuestionArray>(`http://localhost:8080/questions?search=${searchQuery}&sort=${sort}`);
  }

  public getQuestionAnswers(questionId: number): Observable<AnswerArray>{
    return this.httpClient.get<AnswerArray>(`http://localhost:8080/questions/${questionId}/answers`);
  }

  public createAnswer(createAnswer: CreateAnswer, questionId: number): Observable<Answer>{
    const headers = this.getHeaderWithToken();
    return this.httpClient.post<Answer>(`http://localhost:8080/questions/${questionId}/answers`, createAnswer, { headers });
  }

  public updateQuestion(questionId: number, updateQuestion: UpdateQuestion): Observable<Question>{
    return this.httpClient.patch<Question>(`http://localhost:8080/questions/${questionId}`, updateQuestion);
  }
}
