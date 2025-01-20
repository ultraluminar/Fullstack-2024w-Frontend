import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Answer } from '../model/answer/answer';
import { UpdateAnswer } from '../model/answer/update-answer';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
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

  public getAnswer(answerId: number): Observable<Answer> {
    return this.httpClient.get<Answer>(`http://localhost:8080/answers/${answerId}`);
  }

  public deleteAnswer(answerId: number): Observable<void> {
    const headers = this.getHeaderWithToken();
    return this.httpClient.delete<void>(`http://localhost:8080/answers/${answerId}`, { headers });
  }

  public updateAnswer(answerId:number, updateAnswer: UpdateAnswer): Observable<Answer> {
    return this.httpClient.patch<Answer>(`http://localhost:8080/answers/${answerId}`, updateAnswer);
  }
}
