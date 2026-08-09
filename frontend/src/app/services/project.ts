import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:5000/api/projects';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProject(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/${id}`
    );
  }

  createProject(project: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl,
      project
    );
  }

  updateProject(id: string, project: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${id}`,
      project
    );
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/${id}`
    );
  }

}
