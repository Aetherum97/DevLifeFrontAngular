import { inject, Injectable } from '@angular/core';
import { AuthRepositoryService } from '../repositories/auth-repository.service';
import { AuthStorageService } from './auth-storage.service';
import { AuthStateService } from './auth-state.service';
import { FormGroup } from '@angular/forms';
import { LoginForm, RegisterForm } from '../models/form-submit.model';
import {
  AuthenticateResponses,
  AuthResponse,
} from '../models/auth-responses.model';
import { firstValueFrom } from 'rxjs';
import { NavigationService } from '../../../shared/app-common/services/navigation.service';
import { UserStateService } from '../../../shared/app-common/services/user-state.service';

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

  public async handleLogin(loginForm: FormGroup<LoginForm>): Promise<void> {
    const { email, password } = loginForm.value;

    if (!email || !password) {
      throw new Error('invalid operation: no email or pasword');
    }

    const response = await firstValueFrom(this.authRepo.login(email, password));

    if (!response?.body) throw new Error('invalid operation');

    this.setStorage(response?.body);
    this.navigation.gamePage();
  }

  public handleLogOut() {
    this.clearAuthData();
    this.authRepo.logout();
  }

  public async authenticate(): Promise<void> {
    const response = await firstValueFrom(this.authRepo.authenticate());

    if (!response?.body) throw new Error('invalid operation');

    console.log(response);

    this.setStorage(response?.body);
  }

  private setStorage(response: AuthResponse | AuthenticateResponses): void {
    this.authStorage.setAccessToken(response.accessToken);
    this.authStorage.setRefreshToken('@TODO: false refreshToken');
  }

  private clearAuthData(): void {
    this.authState.clearAuthToken();
    this.authStorage.clearTokens();
    this.userState.clearUser();
  }
}
