import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserStateService } from '../../../shared/app-common/services/user-state.service';
import { NavigationService } from '../../../shared/app-common/services/navigation.service';

export const loginGuard: CanActivateFn = async (route, state) => {
  const userState = inject(UserStateService);
  const navigation = inject(NavigationService);

  if (!userState.isAuthenticated()) {
    navigation.landingPage();
    return false;
  }

  return true;
};
