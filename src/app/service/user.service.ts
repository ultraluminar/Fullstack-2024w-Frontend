import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user/user';
import { Observable } from 'rxjs';
import { QuestionArray } from '../model/question/question-array';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public getUser(userId: number):Observable<User>{
    return this.httpClient.get<User>(`http://localhost:8080/users/${userId}`)
  }
  public deleteUser(userId:number):Observable<User>{
    return this.httpClient.delete<User>(`http://localhost:8080/users/${userId}`)
  }
  public getUserQuestion(userId: number):Observable<QuestionArray>{
    return this.httpClient.get<QuestionArray>(`http://localhost:8080/users/${userId}/questions`)
  }
}
