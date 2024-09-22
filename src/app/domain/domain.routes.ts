import { Routes } from '@angular/router';
import { ListagemProdutoComponent } from './produto/listagem-produto/listagem-produto.component';
import { BreadcrumbResolver } from '../infra/services/breadcrumb.resolver';
import { CadastroProdutoComponent } from './produto/cadastro-produto/cadastro-produto.component';
import { MainLayoutComponent } from '../infra/components/main-layout/main-layout.component';
import { authGuard } from '../infra/guards/auth.guard';

export const domainRoutes: Routes = [
    { 
      path: "produto/listagem", 
      loadComponent: () => import('./produto/listagem-produto/listagem-produto.component')
                            .then(mod => mod.ListagemProdutoComponent),
      data: {
        breadcrumbs: [{
          label: 'Listagem de Produtos',
          route: 'produto/listagem'
        }]
      },
      resolve: { data: BreadcrumbResolver },
      canActivate: [authGuard]
    },
    { 
      path: "produto/cadastro/:id", 
      loadComponent: () => import('./produto/cadastro-produto/cadastro-produto.component')
                            .then(mod => mod.CadastroProdutoComponent),
      data: {
        breadcrumbs: [{
          label: 'Listagem de Produtos',
          route: 'produto/listagem'
        }, {
          label: 'Cadastro de Produtos',
          route: 'produto/cadastro'
        }]
      },
      resolve: { data: BreadcrumbResolver },
      canActivate: [authGuard]   
    }
];