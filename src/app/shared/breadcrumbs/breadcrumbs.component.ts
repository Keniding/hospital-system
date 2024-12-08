// src/app/shared/components/breadcrumbs/breadcrumbs.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {NavigationService} from '../../core/services/navigation.service';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  template: `
    <nav class="breadcrumbs">
      <a [routerLink]="['/']" class="breadcrumb-item">
        <mat-icon>home</mat-icon>
      </a>
      @for (item of navigationService.getBreadcrumbs()(); track item.route; let last = $last) {
        <span class="separator">/</span>
        <a
          [routerLink]="[item.route]"
          class="breadcrumb-item"
          [class.active]="last">
          {{item.label}}
        </a>
      }
    </nav>
  `,
  styles: [`
    .breadcrumbs {
      padding: 8px 16px;
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12);
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      font-size: 14px;
    }

    .breadcrumb-item {
      color: var(--primary-color);
      text-decoration: none;
      display: flex;
      align-items: center;

      &:hover {
        text-decoration: underline;
      }

      &.active {
        color: rgba(0,0,0,0.87);
        pointer-events: none;
      }

      mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }
    }

    .separator {
      margin: 0 8px;
      color: rgba(0,0,0,0.38);
    }
  `]
})
export class BreadcrumbsComponent {
  navigationService = inject(NavigationService);
}
