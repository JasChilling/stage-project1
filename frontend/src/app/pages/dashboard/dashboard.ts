import { Component, OnInit, inject } from '@angular/core';
import { DashboardService } from '../../services/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  private dashboardService = inject(DashboardService);

  dashboardData: any = null;

  loading = true;

  errorMessage = '';

  ngOnInit(): void {

    this.loadDashboard();

  }

  loadDashboard(): void {

    this.dashboardService.getDashboard().subscribe({

      next: (data) => {

        console.log('Dashboard data:', data);

        this.dashboardData = data;

        this.loading = false;

      },

      error: (error) => {

        console.error('Dashboard error:', error);

        this.errorMessage = 'Could not load dashboard data.';

        this.loading = false;

      }

    });

  }

}