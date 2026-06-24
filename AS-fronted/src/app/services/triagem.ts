import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Triagem {
  private apiUrl = 'http://localhost:3000/api/triagem';

  constructor(private http: HttpClient) {}

  cadastrarTriagem(dados: any): Observable<any> {
    return this.http.post(this.apiUrl, dados);
  }

  listarTriagens(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}