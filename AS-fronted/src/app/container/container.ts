import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Sintomas } from '../sintomas/sintomas';
import { Medicamento } from '../medicamento/medicamento';
import { Resumo } from '../resumo/resumo';
import { TriagemResultado } from '../triagem-resultado/triagem-resultado';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Sintomas,
    Medicamento,
    Resumo,
    TriagemResultado,
  ],
  templateUrl: './container.html',
  styleUrl: './container.css',
})
export class Container {
  etapa = 1;
  sintomas: any = {};
  medicamentos: any[] = [];
  resultado: any = null;

  pacienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    // Define os campos do formulário com suas respectivas validações
    this.pacienteForm = this.fb.group({
      nome: ['', Validators.required],
      faixaEtaria: ['', Validators.required],
      idade: ['', [Validators.required, Validators.min(1)]],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      alergias: [''],

      responsavelNome: [''],
      responsavelCpf: [''],
      responsavelTelefone: [''],
      responsavelParentesco: [''],
    });
    //faz com que quando for menor se torna obrigatório colocar de menor e as informaçoes do responsavel
    this.pacienteForm.get('faixaEtaria')?.valueChanges.subscribe((valor) => {
      const campos = [
        'responsavelNome',
        'responsavelCpf',
        'responsavelTelefone',
        'responsavelParentesco',
      ];

      campos.forEach((campo) => {
        const controle = this.pacienteForm.get(campo);

        if (valor === 'menor') {
          controle?.setValidators([Validators.required]);
        } else {
          controle?.clearValidators();
          controle?.setValue('');
        }

        controle?.updateValueAndValidity();
      });
    });
  }

  reiniciarTriagem() {
    this.etapa = 1;
    this.pacienteForm.reset();
    this.sintomas = {};
    this.medicamentos = [];
    this.resultado = null;
  }

  somenteNumeros(campo: string, limite: number) {
    const controle = this.pacienteForm.get(campo);
    const valor = String(controle?.value || '').replace(/\D/g, '').slice(0, limite);
    controle?.setValue(valor, { emitEvent: false });
  }

  somenteLetras(campo: string) {
    const controle = this.pacienteForm.get(campo);
    const valor = String(controle?.value || '').replace(/[^A-Za-zÀ-ÿ\s]/g, '');
    controle?.setValue(valor, { emitEvent: false });
  }

  ehMenorDeIdade() {
    return this.pacienteForm.value.faixaEtaria === 'menor';
  }

  validarIdadeComFaixa(): boolean {
    const faixaEtaria = this.pacienteForm.value.faixaEtaria;
    const idade = Number(this.pacienteForm.value.idade);

    if (faixaEtaria === 'maior' && idade < 18) {
      alert('Paciente menor de 18 anos deve ser marcado como menor de idade.');
      return false;
    }

    if (faixaEtaria === 'menor' && idade >= 18) {
      alert('Paciente com 18 anos ou mais deve ser marcado como maior de idade.');
      return false;
    }

    return true;
  }
  // Avança para a próxima etapa validando o formulário atual
  avancarPaciente() {
    if (this.pacienteForm.invalid) {
      this.pacienteForm.markAllAsTouched();
      return;
    }

    if (!this.validarIdadeComFaixa()) {
      return;
    }

    this.etapa = 2;
  }

  salvarSintomas(dados: any) {
    this.sintomas = dados;
    this.etapa = 3;
  }

  salvarMedicamentos(dados: any[]) {
    this.medicamentos = dados;
    this.etapa = 4;
  }

  salvarResponsavel() {
    if (!this.ehMenorDeIdade()) {
      return null;
    }

    return {
      nome: this.pacienteForm.value.responsavelNome,
      cpf: this.pacienteForm.value.responsavelCpf,
      telefone: this.pacienteForm.value.responsavelTelefone,
      parentesco: this.pacienteForm.value.responsavelParentesco,
    };
  }

  enviar() {
    const dados = {
      paciente: {
        nome: this.pacienteForm.value.nome,
        faixaEtaria: this.pacienteForm.value.faixaEtaria,
        idade: this.pacienteForm.value.idade,
        cpf: this.pacienteForm.value.cpf,
        telefone: this.pacienteForm.value.telefone,
        responsavel: this.salvarResponsavel(),
      },
      alergias: this.pacienteForm.value.alergias,
      sintomas: this.sintomas,
      medicamentos: this.medicamentos,
    };

    this.http.post<any>('http://localhost:3000/api/triagem', dados).subscribe({
      next: (resposta) => {
        this.resultado = resposta.resultado;
        this.etapa = 5;
      },
      error: () => {
        alert('Erro ao enviar os dados para a API.');
      },
    });
  }

  voltar() {
    if (this.etapa > 1) {
      this.etapa--;
    }
  }
}