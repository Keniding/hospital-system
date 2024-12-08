// src/app/layouts/main-layout/main-layout.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {SidebarComponent} from '../../shared/components/sidebar/sidebar.component';
import {FooterComponent} from '../../shared/components/footer/footer.component';
import {BreadcrumbsComponent} from '../../shared/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BreadcrumbsComponent
  ],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <div class="main-content">
        <app-sidebar></app-sidebar>
        <div class="content-wrapper">
          <app-breadcrumbs></app-breadcrumbs>
          <router-outlet></router-outlet>
        </div>
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .main-content {
      display: flex;
      flex: 1;
      margin-top: var(--header-height);
    }

    .content-wrapper {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
    }
  `]
})
export class MainLayoutComponent {}
