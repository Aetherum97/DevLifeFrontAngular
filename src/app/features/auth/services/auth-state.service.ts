import { Injectable, signal, WritableSignal } from '@angular/core';
import { AuthTokens } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private readonly authTokenSignal = signal<AuthTokens | null>(null);

  setAuthTokens(item: AuthTokens): void {
    this.authTokenSignal.set(item);
  }

  clearAuthToken(): void {
    this.authTokenSignal.set(null);
  }

  get authTokens(): WritableSignal<AuthTokens | null> {
    return this.authTokenSignal;
  }
}
