import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginUser } from '../model/user/login-user';
import { CreateUser } from '../model/user/create-user';
import { LoginResponse as LoginResponseInterface } from "../../../../interface/login-response";
import { User } from '../model/user/user';
import { decodeJwt } from 'jose';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpClient: HttpClient;
  userService: UserService;

  private tokenKey = 'token';
  private userKey = 'user';
  private loggedIn = new BehaviorSubject<boolean>(this.hatToken());
  private user = new BehaviorSubject<User | null>(this.getUser());

  constructor(httpClient: HttpClient, userService: UserService) {
    this.httpClient = httpClient;
    this.userService = userService;
  }

  private hatToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  private getUser(): User | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  private handleAuthentication(token: string): void {
    const decodedToken = decodeJwt(token);
    const userIdField = decodedToken["userId"];
    if (!userIdField) {
      return;
    }
    const userId = Number(userIdField);
    this.userService.getUser(userId).subscribe(user => {
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.userKey, JSON.stringify(user));
      this.loggedIn.next(true);
      this.user.next(user);
    });
  }

  public login(loginUser: LoginUser): Observable<LoginResponseInterface>{
    return this.httpClient.post<LoginResponseInterface>('http://localhost:8080/users/login', loginUser).pipe(
      tap(response => {
        const token = response.token;
        if (token) {
          this.handleAuthentication(token);
        }
      })
    );
  }

  public register(createUser: CreateUser): Observable<LoginResponseInterface>{
    return this.httpClient.post<LoginResponseInterface>('http://localhost:8080/users/register', createUser).pipe(
      tap(response => {
        const token = response.token;
        if (token) {
          this.handleAuthentication(token);
        }
      })
    );
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.loggedIn.next(false);
    this.user.next(null);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  public getUserObservable(): Observable<User | null> {
    return this.user.asObservable();
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
