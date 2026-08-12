import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5000/api/profile';


  getProfile(): Observable<any> {

    return this.http.get<any>(this.apiUrl);

  }


  updateProfile(data: any): Observable<any> {

    return this.http.put<any>(
      this.apiUrl,
      data
    );

  }

}