import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthenticateResponses, LoginRequest, LoginResponses } from '../models';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthResponse } from '../models/auth-responses.model';
import { User } from '../../../shared/interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthRepositoryService {
  private readonly http = inject(HttpClient);
  private readonly BASE_API_URL = environment.API_BASE_URL;

  public register(
    username: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http
      .post(`${this.BASE_API_URL}/Auth/register`, {
        email: email,
        username: username,
        password: password,
      })
      .pipe(
        catchError((error) => {
          console.error('Error registering user', error);
          return of(null);
        }),
        map((response) => {
          if (response === null || Object.keys(response).length === 0) {
            return {
              success: true,
              message: 'Registration successful',
            };
          }
          return response;
        })
      );
  }

  public login(
    email: string,
    password: string
  ): Observable<AuthResponse | null> {
    return this.http
      .post<AuthResponse>(`${this.BASE_API_URL}/Auth/login`, {
        email: email,
        password: password,
      })
      .pipe(
        catchError((error) => {
          console.error('Error logging in user', error);
          return of(null);
        })
      );
  }

  public authenticate(): Observable<AuthenticateResponses | null> {
    return this.http
      .post(`${this.BASE_API_URL}/Auth/Authenticate`, null, {
        withCredentials: true,
        responseType: 'text',
        observe: 'response' as const,
      })
      .pipe(
        map((resp) => {
          if (resp.status === 200 && resp.body) {
            const body = JSON.parse(resp.body) as AuthenticateResponses;
            return body;
          }
          return null;
        }),
        catchError((err) => {
          console.error('Error authenticating user', err);
          return of(null);
        })
      );
  }
}
