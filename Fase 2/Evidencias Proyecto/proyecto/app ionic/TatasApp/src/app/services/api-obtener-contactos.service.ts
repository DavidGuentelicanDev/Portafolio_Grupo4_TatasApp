import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FamiliarRegistrado } from '../interfaces/familiar-registrado';
import { environmentLocal } from '../config.local';

@Injectable({
  providedIn: 'root'
})
export class ApiObtenerContactosService {

  private baseUrl = environmentLocal.URLbase; // RUTA API

  constructor(private http: HttpClient) {}

  // AHORA RETORNA UN ARRAY de familiares registrados
  obtenerContactosFamiliar(): Observable<FamiliarRegistrado[]> {
    return this.http.get<FamiliarRegistrado[]>(this.baseUrl + "/usuarios/contactos-registrados");
  }

}
