import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingControllerService } from '../../infra/services/loading-controller.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  form: FormGroup;

  hide = signal(true);

  private loginService = inject(LoginService);
  private router = inject(Router);
  loadingController = inject(LoadingControllerService);
  
  ngOnInit(): void {
    this.form = new FormGroup({
      usuario: new FormControl<string>('', [Validators.required]),
      senha: new FormControl<string>('', [Validators.required])
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  async login() {
    if (!this.form.valid) return;

    this.loginService.autenticar(this.form.controls['usuario'].value, this.form.controls['senha'].value).then((usuario) => {
      this.router.navigate(['produto/listagem']);
    });
  }
}
