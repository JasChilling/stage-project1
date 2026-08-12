import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  totalProjects = 0;
  totalTasks = 0;
  completedTasks = 0;

  recentProjects: any[] = [];

  constructor(
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {

    this.loadDashboard();

  }

  loadDashboard(): void {

    this.dashboardService.getDashboard().subscribe({

      next: (data) => {

        console.log('Dashboard data:', data);

        this.totalProjects = data.totalProjects;
        this.totalTasks = data.totalTasks;
        this.completedTasks = data.completedTasks;

        this.recentProjects = data.recentProjects;

      },

      error: (error) => {

        console.error('Dashboard error:', error);

      }

    });

  }

}