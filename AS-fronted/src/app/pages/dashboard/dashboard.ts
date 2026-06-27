import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
  listaDeUsuarios: any[] = [];
  mensagemErro: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.authService.listarUsuarios().subscribe({
      next: (dadosDaApi) => {
        if (Array.isArray(dadosDaApi)) {
          this.listaDeUsuarios = dadosDaApi;
          this.cdr.detectChanges();
        } else {
          this.listaDeUsuarios = [];
        }
      },
      error: (erro) => {
        this.mensagemErro =
          'Falha ao buscar dados: ' + (erro.error?.erro || erro.message);

        this.cdr.detectChanges();
      },
    });
  }
  fazerLogout(): void {
    this.authService.sair();
    this.router.navigate(['/medform']);
  }
} 