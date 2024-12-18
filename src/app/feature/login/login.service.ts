import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from './models/auth-response.model';
import { jwtDecode } from "jwt-decode";
import { UserJwtPayload } from './models/user-jwt-payload.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private ENDPOINT = 'login';
  private API_URL = environment.apiUrl;

  public loggedInUser: WritableSignal<UserJwtPayload | null> = signal(null);

  constructor(private httpClient: HttpClient, private router: Router) { }

  public async autenticar(usuario:string, senha: string): Promise<UserJwtPayload> {
    const authResponse = (await firstValueFrom(this.httpClient.post<AuthResponse>(`${this.API_URL}${this.ENDPOINT}`, {login: usuario, senha: senha})));
    localStorage.setItem('token', authResponse.token);

    const decodedJwtPayload = jwtDecode<UserJwtPayload>(authResponse.token);
    this.loggedInUser.set(decodedJwtPayload);
    return decodedJwtPayload;
  }

  public checkIfUserLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    
    if (token == null) {
      setTimeout(() => { this.router.navigate(['login']); }, 2000);
      return false;
    }

    const decodedJwtPayload = jwtDecode<UserJwtPayload>(token ?? '');
    this.loggedInUser.set(decodedJwtPayload);
    return true;
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.loggedInUser.set(null);
    this.router.navigate(['login']);
  }
}
