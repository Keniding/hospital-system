// src/app/core/services/layout.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private sidebarExpanded = signal(true);

  getSidebarState() {
    return this.sidebarExpanded;
  }

  toggleSidebar() {
    this.sidebarExpanded.update(state => !state);
  }
}
