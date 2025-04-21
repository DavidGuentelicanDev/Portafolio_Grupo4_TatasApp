import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioLogin } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class ApiUsuariosService {

  private baseUrl = "http://localhost:8000"; //url del servidor local de la api
  //private baseUrl = environment.apiUrl; //url del servidor externo de la api

  constructor(
    private http: HttpClient,
  ) { }

  //ruta raiz de la api (solo para probar conexion)
  obtenerRutaRaiz() {
    return this.http.get(this.baseUrl + "/").pipe();
  }

  //ruta para el login
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
