import { inject, Injectable } from '@angular/core';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly navigate = inject(NavigationService);
  private email: string | null = null;

  constructor() {}

  getEmail(): string | null {
    return this.email;
  }

  setEmail(value: string): void {
    this.email = value;
  }

  submitEmail(email: string): void {
    this.setEmail(email);
    this.navigate.registerPage();
  }
}
