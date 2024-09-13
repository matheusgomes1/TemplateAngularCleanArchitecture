import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TopbarService } from '../../../infra/services/topbar.service';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDatepickerModule],
  templateUrl: './cadastro-produto.component.html',
  styleUrl: './cadastro-produto.component.scss'
})
export class CadastroProdutoComponent implements OnInit {
  form: FormGroup;

  constructor(private topbarService: TopbarService) {
  }

  ngOnInit(): void {
    this.topbarService.setBackRoute('produto/listagem');

    this.form = new FormGroup({
      nome: new FormControl<string | null>(null, [Validators.required]),
      descricao: new FormControl<string | null>(null, [Validators.required]),
      valor: new FormControl<number | null>(null, [Validators.required]),
      dataInclusao: new FormControl<string | null>(null, [Validators.required])
    });

    this.form.valueChanges.subscribe((v) => {
      console.log(v);
    })
  }
}
