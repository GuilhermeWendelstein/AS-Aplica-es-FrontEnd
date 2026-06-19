import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.html'
})
export class Sintomas {
  sintomas = '';
  dor = 0;
  febre = false;

  @Output() proximo = new EventEmitter<any>();

  continuar() {
    this.proximo.emit({
      sintomas: this.sintomas,
      dor: this.dor,
      febre: this.febre
    });
  }
}