import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/login`, {
      email,
      password
    }).pipe(

      tap(response => {

        // Save the JWT returned by Express
        localStorage.setItem('token', response.token);

      })

    );
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<any> {

    return this.http.post<any>(
      `${this.apiUrl}/register`,
      {
        username,
        email,
        password
      }
    );

  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

}