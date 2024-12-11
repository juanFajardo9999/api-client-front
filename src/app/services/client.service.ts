import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getClientInfo(tipoDocumento: string, numeroDocumento: string): Observable<Client> {
    const url = `${this.baseUrl}/clients/${tipoDocumento}/${numeroDocumento}`;
    return this.http.get<Client>(url);
  }
}

