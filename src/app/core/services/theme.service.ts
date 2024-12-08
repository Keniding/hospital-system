// src/app/core/services/theme.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = signal(false);

  constructor() {
    // Detectar preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkMode.set(prefersDark.matches);

    // Escuchar cambios en la preferencia del sistema
    prefersDark.addEventListener('change', (e) => {
      this.isDarkMode.set(e.matches);
      this.updateTheme();
    });
  }

  toggleTheme() {
    this.isDarkMode.update(dark => !dark);
    this.updateTheme();
  }

  private updateTheme() {
    document.body.classList.toggle('dark-theme', this.isDarkMode());
  }

  getIsDarkMode() {
    return this.isDarkMode;
  }
}
