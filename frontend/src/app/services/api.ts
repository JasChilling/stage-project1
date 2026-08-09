import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  testConnection() {
    return this.http.get('http://localhost:5000/');
  }
}