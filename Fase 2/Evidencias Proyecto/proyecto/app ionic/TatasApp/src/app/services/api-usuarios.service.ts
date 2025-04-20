import { Injectable } from '@angular/core';
//importaciones para conectar a la api
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiUsuariosService {

  private baseUrl = "http://localhost:8000"; //url del servidor local de la api
  //private baseUrl = environment.apiUrl; //url del servidor externo de la api

  constructor() { }
}
