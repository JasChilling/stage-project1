import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  errorMessage = '';

  constructor(private authService: AuthService) {}

  login(): void {

    this.errorMessage = '';

    this.authService.login(
      this.email,
      this.password
    ).subscribe({

      next: (response) => {

        console.log('Login successful!');
        console.log(response);

      },

      error: (error) => {

        console.error(error);

        this.errorMessage =
          error.error?.message ||
          'Login failed';

      }

    });

  }

}