import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.html'
})
export class Container {
  etapa = 1;
  dados: any = {};
  resultado: any = null;

  proximo(dado: any) {
    this.dados = { ...this.dados, ...dado };
    this.etapa++;
  }

  finalizar(dados: any) {
    console.log('Enviar para backend:', dados);

    // simulação de resposta
    this.resultado = {
      nivel: 'Médio',
      mensagem: 'Procure atendimento'
    };

    this.etapa = 4;
  }
}