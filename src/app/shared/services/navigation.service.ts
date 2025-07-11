import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly router = inject(Router);

  public loginPage() {
    this.router.navigate(['/login']);
  }

  public registerPage() {
    this.router.navigate(['/register']);
  }

  public landingPage() {
    this.router.navigate(['/']);
  }

  public gamePage() {
    console.log('gamePage');
    this.router.navigate(['/home']);
  }
}
