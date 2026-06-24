import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sintomas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sintomas.html',
})
export class Sintomas {
  @Output() continuar = new EventEmitter<any>();
  @Output() voltarEtapa = new EventEmitter<void>();

  form: FormGroup;
  mostrarPerguntas = false;

  sintomasSeparados: string[] = [];
  niveisSintomas: any = {};

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      descricao: ['', Validators.required],
    });
  }

  separarSintomas() {
    const descricao = this.form.value.descricao?.trim();

    if (!descricao) {
      this.form.get('descricao')?.markAsTouched();
      return;
    }

    this.sintomasSeparados = descricao
      .split(/,| e /i)
      .map((sintoma: string) => sintoma.trim())
      .filter((sintoma: string) => sintoma.length > 0);

    this.niveisSintomas = {};

    this.sintomasSeparados.forEach((sintoma) => {
      this.niveisSintomas[sintoma] = 1;
    });

    this.mostrarPerguntas = true;
  }

  alterarNivel(sintoma: string, event: Event) {
    const input = event.target as HTMLInputElement;
    this.niveisSintomas[sintoma] = Number(input.value);
  }

  enviar() {
    const sintomasDetalhados = this.sintomasSeparados.map((sintoma) => ({
      nome: sintoma,
      nivel: this.niveisSintomas[sintoma],
    }));

    const maiorNivel = Math.max(
      ...sintomasDetalhados.map((sintoma) => sintoma.nivel)
    );

    const temFebre = this.sintomasSeparados.some((sintoma) =>
      sintoma.toLowerCase().includes('febre')
    );

    this.continuar.emit({
      descricao: this.form.value.descricao,
      sintomasDetalhados,
      nivelDor: maiorNivel,
      temFebre,
    });
  }
}