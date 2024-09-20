import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ListResponse } from '../../../infra/models/list-response.model';
import { Produto } from '../models/produto.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProdutoService {
  private ENDPOINT = 'produtos';
  private API_URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getProdutos(page:number, perPage: number): Observable<ListResponse<Produto>> {
    return this.httpClient.get<ListResponse<Produto>>(`${this.API_URL}${this.ENDPOINT}?_page=${page}&_per_page=${perPage}`);
  }
}