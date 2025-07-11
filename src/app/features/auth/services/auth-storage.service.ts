import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  private readonly localStorage = inject(LocalStorageService);

  setAccessToken(token: string): void {
    this.localStorage.setItem('accessToken', token);
  }

  getAccessToken() {
    return this.localStorage.getItem('accessToken');
  }

  setRefreshToken(token: string): void {
    this.localStorage.setItem('refreshToken', token);
  }

  getRefreshToken() {
    return this.localStorage.getItem('refreshToken');
  }

  clearTokens(): void {
    this.localStorage.removeItem('accessToken');
    this.localStorage.removeItem('refreshToken');
  }
}
