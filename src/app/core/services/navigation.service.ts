// src/app/core/services/navigation.service.ts
import { Injectable, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface BreadcrumbItem {
  label: string;
  route: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private currentPath = signal<string>('');
  private breadcrumbs = signal<BreadcrumbItem[]>([]);

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath.set(event.urlAfterRedirects);
        this.updateBreadcrumbs(event.urlAfterRedirects);
      }
    });
  }

  private updateBreadcrumbs(path: string) {
    const pathSegments = path.split('/').filter(segment => segment);
    const breadcrumbs: BreadcrumbItem[] = [];
    let currentPath = '';

    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;
      breadcrumbs.push({
        label: this.formatBreadcrumbLabel(segment),
        route: currentPath
      });
    });

    this.breadcrumbs.set(breadcrumbs);
  }

  private formatBreadcrumbLabel(segment: string): string {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  getCurrentPath() {
    return this.currentPath;
  }

  getBreadcrumbs() {
    return this.breadcrumbs;
  }
}
