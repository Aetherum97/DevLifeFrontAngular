import { FormControl } from '@angular/forms';

export interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface RegisterForm {
  userName: FormControl<string>;
  email: FormControl<string>;
  password1: FormControl<string>;
  password2: FormControl<string>;
}
