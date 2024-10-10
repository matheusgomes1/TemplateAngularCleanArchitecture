import { Injectable } from "@angular/core";
import { ProdutoFiltro } from "../models/produto-filtro.model";

@Injectable()
export class ProdutoFiltroService {
  private filtroProduto: ProdutoFiltro;

  constructor() { }

  setFiltro(
    pagina: number, 
    tamanhoPagina: number, 
    ordenadoPor: string | undefined = 'produtoId', 
    decrescente: boolean = false,
    nome: string | undefined = '') {
      if (!this.filtroProduto)
        this.filtroProduto = {};

      this.filtroProduto.pagina = pagina;
      this.filtroProduto.tamanhoPagina = tamanhoPagina;
      this.filtroProduto.ordenadoPor = ordenadoPor;
      this.filtroProduto.decrescente = decrescente;
      this.filtroProduto.nome = nome;
  }

  setPagina(pagina: number, tamanhoPagina: number) {
    this.filtroProduto.pagina = pagina;
    this.filtroProduto.tamanhoPagina = tamanhoPagina;
  }

  setOrdenacao(ordenadoPor: string, decrescente: boolean) {
    if (!this.filtroProduto)
      this.filtroProduto = {pagina: 0, tamanhoPagina: 5, ordenadoPor: 'produtoId', decrescente: false};

    this.filtroProduto.ordenadoPor = ordenadoPor;
    this.filtroProduto.decrescente = decrescente;
  }

  get(): ProdutoFiltro {
    return this.filtroProduto;
  }
}