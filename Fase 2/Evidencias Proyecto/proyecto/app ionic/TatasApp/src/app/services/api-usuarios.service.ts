import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioLogin } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class ApiUsuariosService {

  //URL de la API, puede cambiar
  private baseUrl = "https://7a33a53e-f653-4918-b3d4-e7acfcefc43c-00-wq0t0p4r0orv.riker.replit.dev";

  constructor(
    private http: HttpClient,
  ) { }

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
