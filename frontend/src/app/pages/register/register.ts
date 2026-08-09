import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  username = '';
  email = '';
  password = '';

  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register(): void {

    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(
      this.username,
      this.email,
      this.password
    ).subscribe({

      next: (response) => {

        console.log('Registration successful:', response);

        this.successMessage =
          'Account created successfully! Redirecting to login...';

        setTimeout(() => {

          this.router.navigate(['/login']);

        }, 1500);

      },

      error: (error) => {

        console.error(error);

        this.errorMessage =
          error.error?.message ||
          'Registration failed';

      }

    });

  }

}