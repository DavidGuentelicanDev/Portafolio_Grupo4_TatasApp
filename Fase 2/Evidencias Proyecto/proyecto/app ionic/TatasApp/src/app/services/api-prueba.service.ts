import { Injectable } from '@angular/core';
//importaciones para conectar a la api
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiPruebaService {

  //private baseUrl = "http://localhost:8000"; //url del servidor local de la api
  private baseUrl = environment.apiUrl; //url del servidor externo de la api

  constructor(
    private http: HttpClient, //dependencia para conectar la api
  ) { }

  //ruta raiz de la api (solo para probar conexion)
  obtenerRutaRaiz() {
    return this.http.get(this.baseUrl + "/").pipe();
  }
  
  //todos los usuarios (solo para probar conexion)
  obtenerTodosLosUsuarios() {
    console.log('tatasi '+ this.baseUrl + '/usuarios')
    return this.http.get(this.baseUrl + "/usuarios").pipe();
    
  }

}
