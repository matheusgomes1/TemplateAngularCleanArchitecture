import { Routes } from '@angular/router';
import { domainRoutes } from './domain/domain.routes';
import { MainLayoutComponent } from './infra/components/main-layout/main-layout.component';
import { LoginComponent } from './domain/login/login.component';
import { authGuard } from './infra/guards/auth.guard';

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
  }
];
