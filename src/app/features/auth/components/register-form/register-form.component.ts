import { Component, inject, output, signal } from '@angular/core';
import { EmailService } from '../../../../shared/services/email.service';
import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterForm } from '../../models';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-form',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  private readonly emailService = inject(EmailService);
  private readonly authService = inject(AuthService);

  public formSubmit = output<RegisterForm>();
  public isPasswordHided = signal<boolean>(true);

  public hidePassword(event: MouseEvent) {
    this.isPasswordHided.set(!this.isPasswordHided());
    event.stopPropagation();
  }

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
        Validators.pattern(
          '^(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{};\'":\\\\|,.<>\\/?]).{8,}$'
        ),
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
