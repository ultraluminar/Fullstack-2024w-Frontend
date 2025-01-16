import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUser } from '../model/user/login-user';
import { CreateUser } from '../model/user/create-user';
import { LoginResponse as LoginResponseInterface } from "../../../../interface/login-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  public login(loginUser: LoginUser): Observable<LoginResponseInterface>{
    return this.httpClient.post<LoginResponseInterface>('http://localhost:8080/users/login', loginUser);
  }

  public register(createUser: CreateUser): Observable<LoginResponseInterface>{
    return this.httpClient.post<LoginResponseInterface>('http://localhost:8080/users/register', createUser);
  }

}
