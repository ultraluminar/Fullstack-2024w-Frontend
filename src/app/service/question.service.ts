import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../model/question/question';

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
}
