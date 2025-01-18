import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Answer } from '../model/answer/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public getAnswer(answerId: number): Observable<Answer> {
    return this.httpClient.get<Answer>(`http://localhost:8080/questions/${answerId}`);
  }
}
