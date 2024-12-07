// src/app/core/models/nav-item.interface.ts
export interface NavItem {
  label: string;
  icon: string;
  route: string;
  children?: NavItem[];
}
