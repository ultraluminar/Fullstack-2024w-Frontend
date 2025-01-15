import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/userLogin';
import { UserRegister } from '../model/user-register';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  public loginUser(user: User): Observable<User>{
    return this.httpClient.post<User>('http://localhost:8080/users/login', user);
  }

  public registUser(userRegister: UserRegister): Observable<UserRegister>{
    return this.httpClient.post<UserRegister>('http://localhost:8080/users/register', userRegister);
  }

}
