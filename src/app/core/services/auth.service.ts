// src/app/core/services/auth.service.ts
import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {AuthResponse, LoginCredentials, User} from '../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = signal<User | null>(null);
  private token = signal<string | null>(null);

  isAuthenticated = computed(() => !!this.user());
  currentUser = computed(() => this.user());

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadAuthState();
  }

  private loadAuthState() {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      this.token.set(savedToken);
      this.user.set(JSON.parse(savedUser));
    }
  }

  private saveAuthState(response: AuthResponse) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.token.set(response.token);
    this.user.set(response.user);
  }

  async login(credentials: LoginCredentials): Promise<void> {
    try {
      const response = await this.http.post<AuthResponse>(
        `${environment.apiUrl}/auth/login`,
        credentials
      ).toPromise();

      if (response) {
        this.saveAuthState(response);
        await this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      throw new Error('Error en el inicio de sesión');
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.token.set(null);
    this.user.set(null);
    await this.router.navigate(['/auth/login']);
  }

  getAuthToken(): string | null {
    return this.token();
  }

  hasRole(role: string | string[]): boolean {
    const user = this.user();
    if (!user) return false;

    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  }
}
