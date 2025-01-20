import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user/user';
import { Observable } from 'rxjs';
import { QuestionArray } from '../model/question/question-array';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpClient: HttpClient;
  private authService: AuthService;

  constructor(httpClient: HttpClient, authService: AuthService) {
    this.httpClient = httpClient;
    this.authService = authService;
  }

  private getHeaderWithToken(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  public getUser(userId: number):Observable<User>{
    return this.httpClient.get<User>(`http://localhost:8080/users/${userId}`);
  }
  public deleteUser(userId:number):Observable<User>{
    const headers = this.getHeaderWithToken();
    return this.httpClient.delete<User>(`http://localhost:8080/users/${userId}`, { headers });
  }
  public getUserQuestions(userId: number):Observable<QuestionArray>{
    return this.httpClient.get<QuestionArray>(`http://localhost:8080/users/${userId}/questions`);
  }
}
