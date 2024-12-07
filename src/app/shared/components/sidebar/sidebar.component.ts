// src/app/shared/components/sidebar/sidebar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import {NavItem} from '../../../core/models/nav-item.interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule
  ],
  template: `
    <div class="sidebar" [class.expanded]="isExpanded">
      <mat-nav-list>
        @for (item of navItems; track item.route) {
          @if (!item.children) {
            <a mat-list-item [routerLink]="[item.route]" routerLinkActive="active">
              <mat-icon matListItemIcon>{{item.icon}}</mat-icon>
              <span matListItemTitle>{{item.label}}</span>
            </a>
          } @else {
            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>
                  <mat-icon>{{item.icon}}</mat-icon>
                  <span>{{item.label}}</span>
                </mat-panel-title>
              </mat-expansion-panel-header>
              @for (child of item.children; track child.route) {
                <a mat-list-item [routerLink]="[child.route]" routerLinkActive="active">
                  <mat-icon matListItemIcon>{{child.icon}}</mat-icon>
                  <span matListItemTitle>{{child.label}}</span>
                </a>
              }
            </mat-expansion-panel>
          }
        }
      </mat-nav-list>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      background-color: #fff;
      box-shadow: 2px 0 6px rgba(0,0,0,0.1);
      height: 100%;
      transition: width 0.3s ease;

      &.expanded {
        width: 250px;
      }

      &:not(.expanded) {
        width: 60px;

        .mat-list-item-content {
          padding: 0 8px;
        }

        span {
          display: none;
        }
      }
    }

    .mat-nav-list {
      padding-top: 0;
    }

    .mat-list-item {
      &.active {
        background-color: rgba(0,0,0,0.04);
        color: var(--primary-color);

        mat-icon {
          color: var(--primary-color);
        }
      }
    }

    mat-icon {
      margin-right: 12px;
    }

    .mat-expansion-panel {
      box-shadow: none;
      background: transparent;

      .mat-expansion-panel-header {
        padding: 0 16px;
      }

      .mat-expansion-panel-header-title {
        align-items: center;

        mat-icon {
          margin-right: 12px;
        }
      }
    }
  `]
})
export class SidebarComponent {
  isExpanded = true;

  navItems: NavItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      label: 'Pacientes',
      icon: 'pets',
      route: '/patients',
      children: [
        {
          label: 'Lista de Pacientes',
          icon: 'list',
          route: '/patients/list'
        },
        {
          label: 'Nuevo Paciente',
          icon: 'add',
          route: '/patients/new'
        }
      ]
    },
    {
      label: 'Citas',
      icon: 'event',
      route: '/appointments',
      children: [
        {
          label: 'Calendario',
          icon: 'calendar_today',
          route: '/appointments/calendar'
        },
        {
          label: 'Nueva Cita',
          icon: 'add',
          route: '/appointments/new'
        }
      ]
    },
    {
      label: 'Inventario',
      icon: 'inventory',
      route: '/inventory'
    },
    {
      label: 'Personal',
      icon: 'people',
      route: '/staff'
    },
    {
      label: 'Facturación',
      icon: 'receipt',
      route: '/billing'
    },
    {
      label: 'Reportes',
      icon: 'bar_chart',
      route: '/reports'
    },
    {
      label: 'Configuración',
      icon: 'settings',
      route: '/settings'
    }
  ];

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
}
