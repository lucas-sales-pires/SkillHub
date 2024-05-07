import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AcordoService {
  public termo = signal(false);

  constructor() { }

  aceitarTermos() {
    this.termo.set(!this.termo);
  }
  pegarTermos() {
    return this.termo;
  }

}
