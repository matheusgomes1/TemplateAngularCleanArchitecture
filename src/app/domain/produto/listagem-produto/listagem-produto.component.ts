import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/produto.model';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listagem-produto',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, DatePipe],
  templateUrl: './listagem-produto.component.html',
  styleUrl: './listagem-produto.component.scss'
})
export class ListagemProdutoComponent implements OnInit {
  produtos: Produto[];

  displayedColumns: string[] = ['nome', 'descricao', 'valor', 'dataInclusao'];

  ngOnInit(): void {
    this.produtos = [
      {
        nome: 'Produto 1',
        descricao: 'Descricao produto 1',
        valor: 100.98,
        dataInclusao: '2024-10-30'
      },
      {
        nome: 'Produto 2',
        descricao: 'Descricao produto 2',
        valor: 50,
        dataInclusao: '2024-10-30'
      },
      {
        nome: 'Produto 3',
        descricao: 'Descricao produto 3',
        valor: 12.50,
        dataInclusao: '2024-10-30'
      },
      {
        nome: 'Produto 4',
        descricao: 'Descricao produto 4',
        valor: 100.98,
        dataInclusao: '2024-10-30'
      },
      {
        nome: 'Produto 5',
        descricao: 'Descricao produto 5',
        valor: 100.98,
        dataInclusao: '2024-10-30'
      }
    ]
  }
}
