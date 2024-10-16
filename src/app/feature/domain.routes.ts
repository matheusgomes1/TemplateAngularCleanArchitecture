import { Routes } from '@angular/router';
import { BreadcrumbResolver } from '../core/services/breadcrumb.resolver';
import { authGuard } from '../core/guards/auth.guard';
import { produtoRoutes } from './produto/produto.routes';

export const domainRoutes: Routes = [
  ...produtoRoutes
];