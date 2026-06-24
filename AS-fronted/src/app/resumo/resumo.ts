import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-resumo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumo.html',
})
export class Resumo {
  @Input() paciente: any;
  @Input() sintomas: any;
  @Input() medicamentos: any[] = [];

  @Output() confirmar = new EventEmitter<void>();
  @Output() voltarEtapa = new EventEmitter<void>();
}