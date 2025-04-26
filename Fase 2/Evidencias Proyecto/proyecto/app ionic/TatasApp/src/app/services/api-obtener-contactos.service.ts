import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FamiliarRegistrado } from '../interfaces/familiar-registrado'; // este sí está bien

@Injectable({
  providedIn: 'root'
})
export class ApiObtenerContactosService {

  private baseUrl = "https://7a33a53e-f653-4918-b3d4-e7acfcefc43c-00-wq0t0p4r0orv.riker.replit.dev"; // RUTA API

  constructor(private http: HttpClient) {}

  // AHORA RETORNA UN ARRAY de familiares registrados
  obtenerContactosFamiliar(): Observable<FamiliarRegistrado[]> {
    return this.http.get<FamiliarRegistrado[]>(this.baseUrl + "/usuarios/contactos-registrados");
  }
}
