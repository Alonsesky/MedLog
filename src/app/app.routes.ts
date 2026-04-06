import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './guards/public.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home/home.page').then(m => m.HomePage),
  },
  {
    path: 'register',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./pages/register/register.page').then(m => m.RegisterPage),
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] },
    loadComponent: () =>
      import('./pages/admin/admin.page').then(m => m.AdminPage),
  },
  {
    path: 'medic',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'medic'] },
    loadComponent: () =>
      import('./pages/medic/medic.page').then(m => m.MedicPage),
  },
  {
    path: 'patient',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'medic', 'patient'] },
    loadComponent: () =>
      import('./pages/patient/patient.page').then(m => m.PatientPage),
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./pages/unauthorized/unauthorized.page').then(m => m.UnauthorizedPage),
  },
  {
    path: 'login',
    canActivate: [publicGuard],
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage),
  },
  {
    path: 'medic',
    loadComponent: () => import('./pages/medic/medic.page').then( m => m.MedicPage)
  }
];
