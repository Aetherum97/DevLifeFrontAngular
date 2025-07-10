import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalisationService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class LocalisationGuard implements CanActivate {
  private readonly localisationService = inject(LocalisationService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const language = route.data['language'];
    if (language) {
      this.localisationService.changeLocalisation(language);
    }
    return true;
  }
}
