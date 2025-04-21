import { Injectable } from '@angular/core';
//importa clase http para peticiones hacia un servidor API //Andrea //16/04/2025
import { HttpClient } from '@angular/common/http'; 
import { environment } from 'src/environments/environment';

import { Direccion } from '../interfaces/direccion';
import { catchError, tap } from 'rxjs';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ApiUsuariosService {

  
  verificar_usuario(){
    throw new Error('Method not implemented.');
  }

  //private baseUrl = "http://localhost:8000"; //url del servidor local de la api
  private baseUrl = environment.apiUrl; //url del servidor externo de la api

  constructor(private http: HttpClient , private alertController: AlertController) { }

  registrar_usuario(
    nombres: string,
    apellidos: string,
    fecha_nacimiento: Date,
    correo: string,
    telefono: number,
    tipo_usuario: number,
    contrasena: string,
    direccion: Direccion
  ) {
    const usuario = {
      nombres,
      apellidos,
      fecha_nacimiento,
      correo,
      telefono,
      tipo_usuario,
      contrasena,
      direccion
    };
  
    console.log('tatas ' + this.baseUrl + '/usuarios/registro_usuario');
  
    return this.http.post(this.baseUrl + '/usuarios/registro_usuario', usuario).pipe(
      tap(async (respuesta: any) => {
        const header = respuesta.status === 'success' ? 'Éxito' : 'Error';
        const mensaje = respuesta.message || 'Operación completada';
        await this.presentAlert(header, mensaje);
      }),
      catchError(async (error: any) => {
        const mensajes = error?.error?.errors?.map((e: any) => e.message).join('\n');
        const header = 'Error';
        const mensajeError = error?.error?.message || 'Ocurrió un error inesperado';
        await this.presentAlert(header, mensajes || mensajeError);
        throw error;
      })
    );
  }
  
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
