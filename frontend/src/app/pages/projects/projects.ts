import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project';

@Component({
  selector: 'app-projects',
  imports: [DatePipe, FormsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements OnInit {

  projects: any[] = [];

 
  showForm = false;


  newProject = {
    title: '',
    description: '',
    status: 'Planning',
    priority: 'Medium',
    deadline: ''
  };

  errorMessage = '';

  constructor(
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

loadProjects(): void {

  this.projectService.getProjects().subscribe({

    next: (data) => {

      console.log('Projects loaded:', data);

      this.projects = [...data];

      console.log('Projects array after assignment:', this.projects);
      console.log('Number of projects:', this.projects.length);

    },

    error: (error) => {

      console.error('Failed to load projects:', error);

      this.errorMessage =
        error.error?.message || 'Failed to load projects';

    }

  });

}

  openCreateForm(): void {

    this.showForm = true;

    this.errorMessage = '';

  }

  closeCreateForm(): void {

    this.showForm = false;

    this.resetForm();

  }

  createProject(): void {

    this.errorMessage = '';

    this.projectService
      .createProject(this.newProject)
      .subscribe({

        next: (project) => {

          console.log('Project created:', project);

          
          this.projects.push(project);

          
          this.showForm = false;

         
          this.resetForm();

        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            error.error?.message ||
            'Failed to create project';

        }

      });

  }

  resetForm(): void {

    this.newProject = {
      title: '',
      description: '',
      status: 'Planning',
      priority: 'Medium',
      deadline: ''
    };

  }

}