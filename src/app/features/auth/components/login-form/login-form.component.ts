import { Component, inject, output, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LoginForm } from '../../models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  public formSubmit = output<LoginForm>();
  public isPasswordHided = signal<boolean>(true);

  public hidePassword(event: MouseEvent) {
    this.isPasswordHided.set(!this.isPasswordHided());
    event.stopPropagation();
  }
  private readonly authService = inject(AuthService);

  loginForm = new FormGroup<LoginForm>({
    email: new FormControl('', {
      nonNullable: true,
    }),
    password: new FormControl('', {
      nonNullable: true,
    }),
  });

  handleSubmit() {
    this.authService.handleLogin(this.loginForm);
  }
}
