import { inject, Injectable } from '@angular/core';
import { AuthRepositoryService } from '../repositories/auth-repository.service';
import { AuthStorageService } from './auth-storage.service';
import { AuthStateService } from './auth-state.service';
import { NavigationService } from '../../../shared/services/navigation.service';
import { UserStateService } from '../../../shared/services/user-state.service';
import { FormGroup } from '@angular/forms';
import { LoginForm, RegisterForm } from '../models/form-submit.model';
import {
  AuthenticateResponses,
  AuthResponse,
} from '../models/auth-responses.model';
import { Observable, tap } from 'rxjs';
import { User } from '../../../shared/interface/user.interface';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authRepo = inject(AuthRepositoryService);
  private readonly authStorage = inject(AuthStorageService);
  private readonly authState = inject(AuthStateService);
  private readonly navigation = inject(NavigationService);
  private readonly userState = inject(UserStateService);

  public passwordMatch(registerForm: FormGroup<RegisterForm>): boolean {
    return registerForm.value.password1 === registerForm.value.password2;
  }

  public handleRegister(registerForm: FormGroup<RegisterForm>): void {
    const { userName, email, password1: password } = registerForm.value;

    if (!email || !password || !userName) {
      return;
    }

    this.authRepo.register(userName, email, password).subscribe({
      next: (response) => {
        if (response) {
          this.navigation.landingPage();
        }
      },
      error: (error) => console.error('Registration failed', error),
    });
  }

  public handleLogin(loginForm: FormGroup<LoginForm>): void {
    const { email, password } = loginForm.value;

    if (!email || !password) {
      return;
    }

    this.authRepo.login(email, password).subscribe({
      next: (response) => {
        if (response) {
          console.log(response);
          this.setStorage(response);
          this.updateAuthAndUserStates(response).subscribe({
            next: () => {
              this.navigation.gamePage();
            },
          });
        } else {
          console.warn('Login failed, API returned no data.');
        }
      },
      error: (error) => console.error('Unexpected error', error),
    });
  }

  private updateAuthAndUserStates(
    response: AuthResponse
  ): Observable<AuthenticateResponses | null> {
    this.authState.setAuthTokens({
      accesToken: response.accessToken,
      refreshToken: response.refreshToken,
    });

    return this.authRepo.authenticate().pipe(
      tap((response) => {
        if (response) {
          console.log('success');
          console.log('authenticate :', response);
        } else {
          this.clearAuthData();
        }
      })
    );
  }

  private setStorage(response: AuthResponse): void {
    this.authStorage.setAccessToken(response.accessToken);
    this.authStorage.setRefreshToken(response.refreshToken);
  }

  private clearAuthData(): void {
    this.authState.clearAuthToken();
    this.authStorage.clearTokens();
    this.userState.clearUser();
  }
}
