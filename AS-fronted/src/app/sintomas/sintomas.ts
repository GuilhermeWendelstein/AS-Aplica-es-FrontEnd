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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      descricao: ['', Validators.required],
      nivelSintoma: [1, Validators.required],
      temFebre: [null, Validators.required],
    });
  }
  // filtra para apenas letras no campo d
  somenteLetrasSintomas() {
    const controle = this.form.get('descricao');
    const valor = String(controle?.value || '').replace(/[^A-Za-zÀ-ÿ\s,]/g, '');
    controle?.setValue(valor, { emitEvent: false });
  }

  enviar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.continuar.emit({
      descricao: this.form.value.descricao,
      sintomasDetalhados: [
        {
          nome: this.form.value.descricao,
          nivel: this.form.value.nivelSintoma,
        },
      ],
      nivelDor: this.form.value.nivelSintoma,
      temFebre: this.form.value.temFebre,
    });
  }
}