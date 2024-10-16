import { Routes } from '@angular/router';
import { domainRoutes } from './feature/domain.routes';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { LoginComponent } from './feature/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: domainRoutes,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
