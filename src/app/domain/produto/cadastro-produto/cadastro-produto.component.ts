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
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  providers: [ProdutoService],
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule],
  templateUrl: './cadastro-produto.component.html',
  styleUrl: './cadastro-produto.component.scss'
})
export class CadastroProdutoComponent implements OnInit {
  form: FormGroup;

  constructor(private topbarService: TopbarService,
    private notificationService: NotificationService,
    private produtoService: ProdutoService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.topbarService.setBackRoute('produto/listagem');

    this.form = new FormGroup({
      nome: new FormControl<string | null>(null, [Validators.required]),
      descricao: new FormControl<string | null>(null, [Validators.required]),
      valor: new FormControl<number | null>(null, [Validators.required]),
      dataInclusao: new FormControl<Date | null>(null, [Validators.required])
    });
  }

  salvar() {
    if (!this.form.valid)
      return;

    this.produtoService.post(this.form.value).subscribe(
      (produto) => { 
        this.notificationService.showSuccess('Produto cadastrado!', `Produto ${produto.id} - ${produto.nome}`); 
        this.router.navigate(['produto/listagem']);
      }
    );
  }
}
