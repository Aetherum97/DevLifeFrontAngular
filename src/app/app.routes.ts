import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './features/auth/pages/register-page/register-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    title: 'Register',
  },
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'Login',
  },
];
