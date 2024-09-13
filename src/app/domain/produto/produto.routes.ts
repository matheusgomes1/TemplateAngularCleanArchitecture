import { Routes } from '@angular/router';
import { ListagemProdutoComponent } from './listagem-produto/listagem-produto.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { BreadcrumbResolver } from '../../infra/services/breadcrumb.resolver';

export const produtoRoutes: Routes = [
    { 
      path: "produto/listagem", 
      component: ListagemProdutoComponent,
      data: {
        breadcrumbs: [{
          label: 'Listagem de Produtos',
          route: 'produto/listagem'
        }]
      },
      resolve: { data: BreadcrumbResolver }
    },
    { 
      path: "produto/cadastro", 
      component: CadastroProdutoComponent,
      data: {
        breadcrumbs: [{
          label: 'Listagem de Produtos',
          route: 'produto/listagem'
        }, {
          label: 'Cadastro de Produtos',
          route: 'produto/cadastro'
        }]
      },
      resolve: { data: BreadcrumbResolver }   
    }
];