import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-triagem-resultado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './triagem-resultado.html',
})
export class TriagemResultado {
  @Input() resultado: any;

  constructor(private router: Router) {}

  voltarMenu() {
    this.router.navigate(['/dashboard']);
  }
}