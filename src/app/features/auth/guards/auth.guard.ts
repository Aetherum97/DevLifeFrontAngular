import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserStateService } from '../../../shared/services/user-state.service';
import { NavigationService } from '../../../shared/services/navigation.service';

export const authGuard: CanActivateFn = async (routes, state) => {
  const userState = inject(UserStateService);
  const navigation = inject(NavigationService);

  if (userState.isAuthenticated()) {
    navigation.gamePage();
    return false;
  }

  return true;
};
