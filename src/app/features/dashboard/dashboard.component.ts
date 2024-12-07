// src/app/features/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dashboard-container">
      <mat-card class="dashboard-card">
        <mat-card-header>
          <mat-card-title>Pacientes Activos</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="stat-value">24</div>
        </mat-card-content>
      </mat-card>

      <mat-card class="dashboard-card">
        <mat-card-header>
          <mat-card-title>Citas Hoy</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="stat-value">8</div>
        </mat-card-content>
      </mat-card>

      <!-- Más cards aquí -->
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px;
    }

    .dashboard-card {
      .stat-value {
        font-size: 2rem;
        font-weight: bold;
        text-align: center;
        padding: 20px 0;
      }
    }
  `]
})
export class DashboardComponent {}
