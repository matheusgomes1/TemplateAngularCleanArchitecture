import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Arquivo } from './models/arquivo.model';

@Injectable()
export class ArquivoService {
  private ENDPOINT = 'arquivo';
  private API_URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public post(arquivo: Arquivo): Observable<Arquivo> {
    return this.httpClient.post<Arquivo>(`${this.API_URL}${this.ENDPOINT}/cadastrar`, arquivo);
  }

  public delete(id: string) {
    return this.httpClient.delete<number>(`${this.API_URL}${this.ENDPOINT}/deletar/${id}`);
  }

  public getByProdutoId(produtoId: number): Observable<Arquivo[]> {
    return this.httpClient.get<Arquivo[]>(`${this.API_URL}${this.ENDPOINT}/obterPorProduto/${produtoId}`);
  }
}
