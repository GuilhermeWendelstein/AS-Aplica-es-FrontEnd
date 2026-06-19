import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-triagem-resultado',
  imports: [],
  templateUrl: './triagem-resultado.html',
  styleUrl: './triagem-resultado.css',
})
export class TriagemResultado {

}

@Injectable({
  providedIn: 'root'
})
export class TriagemService {

  private api = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  enviar(dados: any) {
    return this.http.post(`${this.api}/triagem`, dados);
  }
}