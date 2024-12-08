// src/app/shared/components/sidebar/sidebar.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {NavItem} from '../../../core/models/nav-item.interface';
import {LayoutService} from '../../../core/services/layout.service';
import {NavigationService} from '../../../core/services/navigation.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatTooltipModule
  ],
  template: `
    <aside class="sidebar" [@sidebarState]="layoutService.getSidebarState()() ? 'expanded' : 'collapsed'">
      <mat-nav-list>
        @for (item of navItems; track item.route) {
          @if (!item.children) {
            <a mat-list-item
               [routerLink]="[item.route]"
               routerLinkActive="active"
               [matTooltip]="!layoutService.getSidebarState()() ? item.label : ''"
               matTooltipPosition="right">
              <mat-icon matListItemIcon>{{item.icon}}</mat-icon>
              <span matListItemTitle [@labelState]="layoutService.getSidebarState()() ? 'show' : 'hide'">
                {{item.label}}
              </span>
            </a>
          } @else {
            <mat-expansion-panel
              [expanded]="isRouteActive(item.route)"
              [@expansionState]="layoutService.getSidebarState()() ? 'expanded' : 'collapsed'">
              <mat-expansion-panel-header>
                <mat-panel-title>
                  <mat-icon>{{item.icon}}</mat-icon>
                  <span [@labelState]="layoutService.getSidebarState()() ? 'show' : 'hide'">
                    {{item.label}}
                  </span>
                </mat-panel-title>
              </mat-expansion-panel-header>
              @for (child of item.children; track child.route) {
                <a mat-list-item
                   [routerLink]="[child.route]"
                   routerLinkActive="active"
                   class="child-item">
                  <mat-icon matListItemIcon>{{child.icon}}</mat-icon>
                  <span matListItemTitle [@labelState]="layoutService.getSidebarState()() ? 'show' : 'hide'">
                    {{child.label}}
                  </span>
                </a>
              }
            </mat-expansion-panel>
          }
        }
      </mat-nav-list>
    </aside>
  `,
  styles: [/* ... estilos previos ... */],
  animations: [
    trigger('sidebarState', [
      state('expanded', style({
        width: 'var(--sidebar-width)'
      })),
      state('collapsed', style({
        width: 'var(--sidebar-collapsed-width)'
      })),
      transition('expanded <=> collapsed', animate('300ms ease'))
    ]),
    trigger('labelState', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0,
        display: 'none'
      })),
      transition('show => hide', animate('200ms ease')),
      transition('hide => show', animate('200ms ease'))
    ]),
    trigger('expansionState', [
      state('expanded', style({
        height: '*'
      })),
      state('collapsed', style({
        height: '48px',
        overflow: 'hidden'
      })),
      transition('expanded <=> collapsed', animate('300ms ease'))
    ])
  ]
})
export class SidebarComponent {
  layoutService = inject(LayoutService);
  navigationService = inject(NavigationService);

  isRouteActive(route: string): boolean {
    return this.navigationService.getCurrentPath()().startsWith(route);
  }

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
}
