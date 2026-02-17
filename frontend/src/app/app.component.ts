import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="app-container">
      <nav class="navbar" *ngIf="authService.isAuthenticated()">
        <div class="container">
          <div class="navbar-content">
            <div class="navbar-brand">
              <h2>💼 Payroll System</h2>
            </div>
            <div class="navbar-menu">
              <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">Dashboard</a>
              <a routerLink="/employees" routerLinkActive="active" class="nav-link">Employees</a>
              <a routerLink="/payroll" routerLinkActive="active" class="nav-link">Payroll</a>
              <a routerLink="/reports" routerLinkActive="active" class="nav-link">Reports</a>
              <button (click)="logout()" class="btn btn-secondary">Logout</button>
            </div>
          </div>
        </div>
      </nav>
      
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
    }

    .navbar {
      background: var(--surface);
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      padding: 1rem 0;
      box-shadow: var(--shadow-md);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .navbar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .navbar-brand h2 {
      margin: 0;
      font-size: 1.5rem;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .navbar-menu {
      display: flex;
      gap: var(--spacing-md);
      align-items: center;
    }

    .nav-link {
      color: var(--text-secondary);
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
      font-weight: 500;
    }

    .nav-link:hover {
      color: var(--text-primary);
      background: rgba(0, 0, 0, 0.05);
    }

    .nav-link.active {
      color: var(--primary-color);
      background: rgba(99, 102, 241, 0.1);
    }

    .main-content {
      padding: 2rem 0;
      min-height: calc(100vh - 80px);
    }

    @media (max-width: 768px) {
      .navbar-menu {
        flex-wrap: wrap;
        gap: var(--spacing-sm);
      }

      .nav-link {
        padding: 0.4rem 0.8rem;
        font-size: 0.9rem;
      }
    }
  `]
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
