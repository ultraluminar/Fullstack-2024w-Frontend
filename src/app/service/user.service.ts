import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user/user';
import { Observable } from 'rxjs';
import { Question } from '../model/question/question';

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
  public getUserQuestions(userId: number):Observable<Question>{
    return this.httpClient.get<Question>(`http://localhost:8080/users/${userId}/questions`)
  }
}
