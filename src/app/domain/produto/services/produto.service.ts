import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ListResponse } from '../../../infra/models/list-response.model';
import { Produto } from '../models/produto.model';
import { HttpClient } from '@angular/common/http';
import { ProdutoFiltro } from '../models/produto-filtro.model';

@Injectable()
export class ProdutoService {
  private ENDPOINT = 'produto';
  private API_URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public get(filtro: ProdutoFiltro): Observable<ListResponse<Produto>> {
    return this.httpClient.get<ListResponse<Produto>>(
      `${this.API_URL}${this.ENDPOINT}/listar?pagina=${filtro.pagina}&tamanhoPagina=${filtro.tamanhoPagina}&ordenadoPor=${filtro.ordenadoPor}&decrescente=${filtro.decrescente ? 'true' : 'false'}`);
  }

  public getById(id: number): Observable<Produto> {
    return this.httpClient.get<Produto>(`${this.API_URL}${this.ENDPOINT}/obter/${id}`);
  }

  public post(produto: Produto): Observable<Produto> {
    return this.httpClient.post<Produto>(`${this.API_URL}${this.ENDPOINT}/cadastrar`, produto);
  }

  public put(produto: Produto): Observable<Produto> {
    return this.httpClient.put<Produto>(`${this.API_URL}${this.ENDPOINT}/atualizar/${produto.produtoId}`, produto);
  }

  public delete(id: string) {
    return this.httpClient.delete<Produto>(`${this.API_URL}${this.ENDPOINT}/deletar/${id}`);
  }
}
