import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ProdutoFiltroService } from '../services/produto-filtro.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ProdutoFiltro } from '../models/produto-filtro.model';

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
  @Output() filtrarEvt: EventEmitter<ProdutoFiltro> = new EventEmitter<ProdutoFiltro>();
  form: FormGroup;

  constructor(private filtroService: ProdutoFiltroService) {
  }

  async ngOnInit() {
    this.form = new FormGroup({
      nome: new FormControl<string>(''),
      descricao: new FormControl<string>('')
    });
  }

  filtrar() {
    this.filtroService.setNome(this.form.controls['nome'].value ?? '');
    this.filtroService.setDescricao(this.form.controls['descricao'].value ?? '');
    this.filtroService.setPagina(0, 5);
    this.filtrarEvt.emit(this.filtroService.get());
  }

  limpar() {
    this.form.reset();
    this.filtroService.setNome(this.form.controls['nome'].value ?? '');
    this.filtroService.setDescricao(this.form.controls['descricao'].value ?? '');
    this.filtroService.setPagina(0, 5);
    this.filtrarEvt.emit(this.filtroService.get());
  }
}
