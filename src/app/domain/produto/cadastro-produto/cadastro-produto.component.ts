import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TopbarService } from '../../../infra/services/topbar.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NotificationService } from '../../../infra/services/notification.service';
import { ProdutoService } from '../services/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../models/produto.model';
import { firstValueFrom } from 'rxjs';
import { SingleFileUpload, SingleFileUploadComponent } from '../../../infra/components/single-file-upload/single-file-upload.component';
import { ArquivoService } from '../../arquivo/arquivo.service';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  providers: [ProdutoService, ArquivoService],
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    SingleFileUploadComponent
  ],
  templateUrl: './cadastro-produto.component.html',
  styleUrl: './cadastro-produto.component.scss'
})
export class CadastroProdutoComponent implements OnInit {
  form: FormGroup;
  idProduto: number;
  produto: Produto;
  arquivoDoProduto: SingleFileUpload;

  constructor(private topbarService: TopbarService,
    private notificationService: NotificationService,
    private produtoService: ProdutoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private arquivoService: ArquivoService
  ) {
  }

  async ngOnInit() {
    this.topbarService.setBackRoute('produto/listagem');
    this.idProduto = this.activatedRoute.snapshot.params['id'];

    if (this.idProduto) {
      this.produto = await firstValueFrom(this.produtoService.getById(this.idProduto));

      const listaArquivos = await firstValueFrom(this.arquivoService.getByProdutoId(this.idProduto));
      const arquivo = listaArquivos[0];
      if (arquivo)
        this.arquivoDoProduto = {base64: arquivo.base64, mimeType: arquivo.mimeType, name: arquivo.name, id: arquivo.arquivoId};
    }

    this.form = new FormGroup({
      nome: new FormControl<string | null>(this.produto?.nome, [Validators.required]),
      descricao: new FormControl<string | null>(this.produto?.descricao, [Validators.required]),
      valor: new FormControl<number | null>(this.produto?.valor, [Validators.required]),
      dataInclusao: new FormControl<Date | string | null>(this.produto?.dataInclusao, [Validators.required])
    });
  }

  salvar() {
    if (!this.form.valid)
      return;

    if (this.idProduto) {
      this.produtoService.put(this.formControlToProduto()).subscribe((produto) => {
        this.notificationService.showSuccess('Produto atualizado!', `Identificador: ${produto.produtoId} - ${produto.nome}`); 
        this.router.navigate(['produto/listagem']);
      })
    } else {
      this.produtoService.post(this.form.value).subscribe(
        (produto) => { 
          this.notificationService.showSuccess('Produto cadastrado!', `Identificador: ${produto.produtoId} - ${produto.nome}`); 
          this.router.navigate(['produto/listagem']);
        }
      );
    }
  }

  formControlToProduto() {
    this.produto = this.produto ?? new Produto();

    this.produto.nome = this.form.controls['nome'].value;
    this.produto.descricao = this.form.controls['descricao'].value;
    this.produto.valor = this.form.controls['valor'].value;
    this.produto.dataInclusao = this.form.controls['dataInclusao'].value;

    return this.produto;
  }

  async uploadArquivo(fileUploaded: SingleFileUpload): Promise<string> {
    const arquivo = await firstValueFrom(this.arquivoService.post({
      produtoId: this.produto?.produtoId ?? '',
      base64: fileUploaded.base64,
      mimeType: fileUploaded.mimeType,
      name: fileUploaded.name
    }));

    return arquivo.arquivoId ?? '';
  }

  async deleteArquivo(fileUploaded: SingleFileUpload): Promise<string> {
    const id = await firstValueFrom(this.arquivoService.delete(fileUploaded.id ?? ''));
    return id.toString();
  }
}
