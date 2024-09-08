import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingControllerService {
  public loadingFlag: WritableSignal<boolean> = signal(false);

  constructor() { }

  public setLoading = (loading: boolean) => this.loadingFlag.set(loading);
}
