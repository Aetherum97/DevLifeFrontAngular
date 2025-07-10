import { Component, inject } from '@angular/core';
import { EmailService } from '../../../../shared/services/email.service';
import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterForm } from '../../models';

@Component({
  selector: 'app-register-form',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  private readonly emailService = inject(EmailService);
  private readonly authService = inject(AuthService);

  registerForm = new FormGroup<RegisterForm>({
    userName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
    email: new FormControl(this.emailService.getEmail() ?? '', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ],
    }),
    password1: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
      ],
    }),
    password2: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
      ],
    }),
  });

  handleSubmit() {
    if (!this.authService.passwordMatch(this.registerForm)) {
      return;
    }

    this.authService.handleRegister(this.registerForm);
  }
}
