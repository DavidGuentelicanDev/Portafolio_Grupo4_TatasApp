import { Injectable } from '@angular/core';
//importaciones para conectar a la api
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiPruebaService {

  private baseUrl = "https://7a33a53e-f653-4918-b3d4-e7acfcefc43c-00-wq0t0p4r0orv.riker.replit.dev";

  constructor(
    private http: HttpClient, //dependencia para conectar la api
  ) { }

  //ruta raiz de la api (solo para probar conexion)
  obtenerRutaRaiz() {
    return this.http.get(this.baseUrl + "/").pipe();
  }

}
