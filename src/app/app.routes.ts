// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./features/auth/auth.routes')
      .then(mod => mod.default)
  },
  {
    path: '',
    component: MainLayoutComponent,
    //canActivate: [authGuard()],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component')
          .then(m => m.DashboardComponent)
      },
      {
        path: 'patients',
        loadComponent: () => import('./features/patients/patient-list/patient-list.component')
          .then(m => m.PatientListComponent)
      },
      {
        path: 'appointments',
        loadComponent: () => import('./features/appointments/appointment-list/appointment-list.component')
          .then(m => m.AppointmentListComponent)
      },
      {
        path: 'inventory',
        loadComponent: () => import('./features/inventory/inventory-list/inventory-list.component')
          .then(m => m.InventoryListComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/reports/reports.component')
          .then(m => m.ReportsComponent)
      },
      {
        path: 'staff',
        loadComponent: () => import('./features/staff/staff-list/staff-list.component')
          .then(m => m.StaffListComponent)
      },
      {
        path: 'billing',
        loadComponent: () => import('./features/billing/billing-list/billing-list.component')
          .then(m => m.BillingListComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
