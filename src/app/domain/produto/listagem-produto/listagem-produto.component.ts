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

@Component({
  selector: 'app-listagem-produto',
  standalone: true,
  imports: [
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    DatePipe, 
    MatPaginatorModule, 
    MatMenuModule,
    MatDialogModule
  ],
  providers: [ProdutoService],
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

  constructor(private loadingController: LoadingControllerService, 
    private router: Router, 
    private produtoService: ProdutoService,
    private topbarService: TopbarService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {
    
  }

  ngOnInit(): void {
    this.topbarService.setBackRoute(null);

    this.produtoService.get(this.pageIndex + 1, this.pageSize).subscribe((resp) => {
      this.produtos = resp.data;
      this.itemsCount = resp.items;
    });
  }

  cadastrar() {
    this.router.navigate(['produto/cadastro']);
  }

  alterarPagina(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;

    this.produtoService.get(this.pageIndex + 1, this.pageSize).subscribe((resp) => {
      this.produtos = resp.data;
    });
  }

  editar(produto: Produto) {
    this.router.navigate(['/produto/edicao', produto.id])
  }

  detalhar(produto: Produto) {
    console.log(produto);
  }

  deletar(produto: Produto) {
    const dialogRef = this.dialog.open(ConfirmDialogCustomComponent, {
      data: {
        labelRefuse: 'Não',
        labelConfirm: 'Sim',
        message: `Tem certeza que deseja excluir o produto ${produto.id}`,
        title: 'Confirmação'
      }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if(confirm) {
        this.produtoService.delete(produto.id ?? '').subscribe((result) => {
          this.notificationService.showSuccess('Excluído com sucesso.', '');

          this.produtoService.get(this.pageIndex + 1, this.pageSize).subscribe((resp) => {
            this.produtos = resp.data;
          });
        });
      }
    });
  }
}
