import { Component, inject, OnInit } from '@angular/core';
import { Produto } from '../models/produto.model';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoadingControllerService } from '../../../infra/services/loading-controller.service';
import { Router } from '@angular/router';
import { TopbarService } from '../../../infra/services/topbar.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ProdutoService } from '../services/produto.service';
import { MatMenuModule } from '@angular/material/menu';
import { NotificationService } from '../../../infra/services/notification.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogCustomComponent, CustomDialogData } from '../../../infra/components/confirm-dialog-custom/confirm-dialog-custom.component';
import { MatSortModule, Sort, SortDirection } from '@angular/material/sort';
import { ProdutoFiltroService } from '../services/produto-filtro.service';
import { FiltroProdutoComponent } from '../filtro-produto/filtro-produto.component';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-listagem-produto',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatExpansionModule,
    FiltroProdutoComponent
  ],
  providers: [ProdutoService, ProdutoFiltroService],
  templateUrl: './listagem-produto.component.html',
  styleUrl: './listagem-produto.component.scss'
})
export class ListagemProdutoComponent implements OnInit {
  produtos: Produto[];
  displayedColumns: string[] = ['nome', 'descricao', 'valor', 'dataInclusao', 'acoes'];
  pageSize: number = 5;
  itemsCount: number;
  pageSizeOptions = [5, 10, 25];
  pageIndex: number = 0;

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private topbarService: TopbarService,
    private notificationService: NotificationService,
    private filtroService: ProdutoFiltroService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.topbarService.setBackRoute(null);

    this.filtroService.setFiltro(this.pageIndex, this.pageSize);
    this.produtoService.get(this.filtroService.get()).subscribe((resp) => {
      this.produtos = resp.content;
      this.itemsCount = resp.totalElements;
    });
  }

  cadastrar() {
    this.router.navigate(['produto/cadastro']);
  }

  alterarPagina(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;

    this.filtroService.setPagina(this.pageIndex, this.pageSize);
    this.produtoService.get(this.filtroService.get()).subscribe((resp) => {
      this.produtos = resp.content;
    });
  }

  editar(produto: Produto) {
    this.router.navigate(['/produto/edicao', produto.produtoId])
  }

  detalhar(produto: Produto) {
    console.log(produto);
  }

  deletar(produto: Produto) {
    const dialogRef = this.dialog.open(ConfirmDialogCustomComponent, {
      data: {
        labelRefuse: 'Não',
        labelConfirm: 'Sim',
        message: `Tem certeza que deseja excluir o produto ${produto.produtoId}`,
        title: 'Confirmação'
      }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if(confirm) {
        this.produtoService.delete(produto.produtoId ?? '').subscribe((result) => {
          this.notificationService.showSuccess('Excluído com sucesso.', '');

          this.produtoService.get(this.filtroService.get()).subscribe((resp) => {
            this.produtos = resp.content;
          });
        });
      }
    });
  }

  ordenarPor(sortEvent: Sort) {
    this.filtroService.setOrdenacao(
      (sortEvent.direction == '') ? 'produtoId' : sortEvent.active,
      (sortEvent.direction == 'desc') ? true : false);

    this.produtoService.get(this.filtroService.get()).subscribe((resp) => {
      this.produtos = resp.content;
    });
  }
}
