import { Component, OnInit } from '@angular/core';
import { ProdutoFiltroService } from '../services/produto-filtro.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-filtro-produto',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './filtro-produto.component.html',
  styleUrl: './filtro-produto.component.scss'
})
export class FiltroProdutoComponent implements OnInit {
  form: FormGroup;

  constructor(private produtoFiltroService: ProdutoFiltroService) {
  }

  async ngOnInit() {
    this.form = new FormGroup({
      nome: new FormControl<string | null>(''),
      descricao: new FormControl<string | null>('')
    });
  }

  filtrar() {
    console.log(this.produtoFiltroService.get());
  }

  limpar() {
    this.form.reset();
    console.log(this.produtoFiltroService.get());
  }
}
