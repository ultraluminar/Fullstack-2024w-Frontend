import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Answer } from '../model/answer/answer';
import { UpdateAnswer } from '../model/answer/update-answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public getAnswer(answerId: number): Observable<Answer> {
    return this.httpClient.get<Answer>(`http://localhost:8080/answers/${answerId}`);
  }

  public deleteAnswer(answerId: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:8080/answers/${answerId}`);
  }

  public updateAnswer(answerId:number, updateAnswer: UpdateAnswer): Observable<Answer> {
    return this.httpClient.patch<Answer>(`http://localhost:8080/answers/${answerId}`, updateAnswer);
  }
}
