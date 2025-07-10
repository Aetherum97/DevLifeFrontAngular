import { computed, Injectable, signal } from '@angular/core';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private readonly userSignal = signal<User | null>(null);

  isAuthenticated = computed(() => !!this.userSignal());

  setUser(user: User | null): void {
    this.userSignal.set(user);
  }

  clearUser(): void {
    this.userSignal.set(null);
  }

  get user() {
    return this.userSignal;
  }
}
