import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-medicamento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './medicamento.html',
})
export class Medicamento {
  @Output() continuar = new EventEmitter<any[]>();
  @Output() voltarEtapa = new EventEmitter<void>();

  usaMedicamento = false;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      medicamentos: this.fb.array([]),
    });
  }

  get medicamentos() {
    return this.form.get('medicamentos') as FormArray;
  }

  adicionarMedicamento() {
    this.medicamentos.push(
      this.fb.group({
        nome: ['', Validators.required],
        dosagem: ['', Validators.required],
      })
    );
  }

  removerMedicamento(index: number) {
    this.medicamentos.removeAt(index);
  }

  alterarUso(valor: boolean) {
    this.usaMedicamento = valor;

    if (valor && this.medicamentos.length === 0) {
      this.adicionarMedicamento();
    }

    if (!valor) {
      this.medicamentos.clear();
    }
  }

  enviar() {
    if (this.usaMedicamento && this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.continuar.emit(this.medicamentos.value);
  }
}