import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Projects } from './pages/projects/projects';
import { Register } from './pages/register/register';

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
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];