import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../model/question/question';
import { CreateQuestion } from '../model/question/create-question';
import { QuestionArray } from '../model/question/question-array';
import { AnswerArray } from '../model/answer/answer-array';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public getQuestion(questionId: number): Observable<Question> {
    return this.httpClient.get<Question>(`http://localhost:8080/questions/${questionId}`);
  }

  public createQuestion(CreateQuestion: CreateQuestion): Observable<Question> {
    return this.httpClient.post<Question>(`http://localhost:8080/questions`, CreateQuestion);
  }

  public deleteQuestion(questionId: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:8080/questions/${questionId}`)
  }

  public getAllQuestions(): Observable<QuestionArray> {
    return this.httpClient.get<QuestionArray>(`http://localhost:8080/questions`);
  }
  public getQuestionAnswers(questionId: number): Observable<AnswerArray>{
    return this.httpClient.get<AnswerArray>(`http://localhost:8080/questions/${questionId}/answers`)
  }
}
