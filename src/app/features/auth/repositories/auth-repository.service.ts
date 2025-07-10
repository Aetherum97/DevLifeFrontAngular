import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthenticateResponses } from '../models';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthResponse } from '../models/auth-responses.model';

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
      .post(
        `${this.BASE_API_URL}/Auth/register`,
        {
          email: email,
          username: username,
          password: password,
        },
        { observe: 'response', withCredentials: true }
      )
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
  ): Observable<HttpResponse<AuthResponse> | null> {
    return this.http
      .post<AuthResponse>(
        `${this.BASE_API_URL}/Auth/login`,
        {
          email: email,
          password: password,
        },
        { observe: 'response', withCredentials: true }
      )
      .pipe(
        catchError((error) => {
          console.error('Error logging in user', error);
          return of(null);
        })
      );
  }

  public logout(): Observable<HttpResponse<void>> {
    const response = this.http.post<void>(
      `${this.BASE_API_URL}/Auth/logout`,
      null,
      { observe: 'response', withCredentials: true }
    );
    return response;
  }

  public authenticate(): Observable<HttpResponse<AuthenticateResponses> | null> {
    return this.http
      .post<AuthenticateResponses>(
        `${this.BASE_API_URL}/Auth/Authenticate`,
        null,
        {
          observe: 'response',
          withCredentials: true,
        }
      )
      .pipe(
        catchError((err) => {
          console.error('Error authenticating user', err);
          return of(null);
        })
      );
  }
}
