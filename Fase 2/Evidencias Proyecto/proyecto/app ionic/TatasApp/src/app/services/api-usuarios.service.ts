import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioLogin } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class ApiUsuariosService {

  //private baseUrl = "http://localhost:8000"; //url del servidor local de la api
  private baseUrl = "https://7a33a53e-f653-4918-b3d4-e7acfcefc43c-00-wq0t0p4r0orv.riker.replit.dev"; //url del servidor externo de la api

  constructor(
    private http: HttpClient,
  ) { }

  //ruta raiz de la api (solo para probar conexion)
  obtenerRutaRaiz() {
    return this.http.get(this.baseUrl + "/").pipe();
  }

  //ruta para el login
  //creado por david el 20/04
  login(correo: string, contrasena: string) {
    let usuario: UsuarioLogin = {
      correo,
      contrasena
    };

    usuario.correo = correo;
    usuario.contrasena = contrasena;

    return this.http.post(this.baseUrl + "/usuarios/login", usuario).pipe();
  }

}
