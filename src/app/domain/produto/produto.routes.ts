import { Routes } from '@angular/router';
import { ListagemProdutoComponent } from './listagem-produto/listagem-produto.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';

export const produtoRoutes: Routes = [
    { path: "produto/listagem", component: ListagemProdutoComponent },
    { path: "produto/cadastro", component: CadastroProdutoComponent }
];