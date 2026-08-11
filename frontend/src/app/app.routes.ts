import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Projects } from './pages/projects/projects';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';  
export const routes: Routes = [

  {
    path: 'login',
    component: Login
  },

  {
    path: 'projects',
    component: Projects
  },
  {
    path: 'register',
    component: Register
  },

  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile').then(m => m.ProfileComponent)
  },

  {
    path: 'dashboard',
    component: Dashboard
  },

   {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];