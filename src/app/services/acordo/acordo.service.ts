import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AcordoService {
  public termo = signal(false);
  

  constructor() { }

  public aceitarTermos() {
    this.termo.set(!this.termo);
  }
  public pegarTermos() {
    return this.termo;
  }

}
