import { Injectable } from "@angular/core";
import { ProdutoFiltro } from "../models/produto-filtro.model";

@Injectable()
export class ProdutoFiltroService {
  public filtroProduto: ProdutoFiltro;

  constructor() { }

  setFiltro(
    pagina: number, 
    tamanhoPagina: number, 
    ordenadoPor: string | undefined = 'produtoId', 
    decrescente: boolean = false,
    nome: string = '',
    descricao: string = '') {
      if (!this.filtroProduto)
        this.filtroProduto = {};

      this.filtroProduto.pagina = pagina;
      this.filtroProduto.tamanhoPagina = tamanhoPagina;
      this.filtroProduto.ordenadoPor = ordenadoPor;
      this.filtroProduto.decrescente = decrescente;
      this.filtroProduto.nome = nome;
      this.filtroProduto.descricao = descricao;
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

  setNome(nome: string) {
    if(!this.filtroProduto) return;

    this.filtroProduto.nome = nome;
  }

  setDescricao(descricao: string) {
    if(!this.filtroProduto) return;

    this.filtroProduto.descricao = descricao;
  }

  get(): ProdutoFiltro {
    return this.filtroProduto;
  }
}