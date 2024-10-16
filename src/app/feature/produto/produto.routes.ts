import { Routes } from "@angular/router";
import { BreadcrumbResolver } from "../../core/services/breadcrumb.resolver";
import { authGuard } from "../../core/guards/auth.guard";

export const produtoRoutes: Routes = [
  {
    path: "produto/listagem",
    loadComponent: () => import('./listagem-produto/listagem-produto.component')
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
    path: "produto/edicao/:id",
    loadComponent: () => import('./cadastro-produto/cadastro-produto.component')
      .then(mod => mod.CadastroProdutoComponent),
    data: {
      breadcrumbs: [{
        label: 'Listagem de Produtos',
        route: 'produto/listagem'
      }, {
        label: 'Edição de Produto',
        route: 'produto/edicao'
      }]
    },
    resolve: { data: BreadcrumbResolver },
    canActivate: [authGuard]
  },
  {

    path: "produto/cadastro",
    loadComponent: () => import('./cadastro-produto/cadastro-produto.component')
      .then(mod => mod.CadastroProdutoComponent),
    data: {
      breadcrumbs: [{
        label: 'Listagem de Produtos',
        route: 'produto/listagem'
      }, {
        label: 'Cadastro de Produto',
        route: 'produto/cadastro'
      }]
    },
    resolve: { data: BreadcrumbResolver },
    canActivate: [authGuard]
  }
];