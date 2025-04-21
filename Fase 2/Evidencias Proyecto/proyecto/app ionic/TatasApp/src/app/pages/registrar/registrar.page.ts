import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { ApiUsuariosService } from 'src/app/services/api-usuarios.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class RegistrarPage implements OnInit {

  usuario: Usuario = {
    mdl_nombres: '',
    mdl_apellidos: '',
    mdl_fecha_nacimiento: '', // puede ser string inicialmente si se convierte después
    mdl_correo_electronico: '',
    mdl_telefono:  null,
    mdl_tipo_usuario: 0,
    mdl_contrasena: '',
    mdl_confirmarContrasena: '',
    direccion: {
      direccion_texto: '',
      calle: '',
      numero: 0,
      adicional: '',
      comuna: '',
      region: '',
      codigo_postal: '',
      latitud: 0,
      longitud: 0
    }
  };

  constructor(
    private alertController: AlertController,
    private api: ApiUsuariosService

  ) {}

  ngOnInit() {

  }

  async registrarUsuario() {
    const u = this.usuario;

    if (
      !u.mdl_nombres ||
      !u.mdl_apellidos ||
      !u.mdl_fecha_nacimiento ||
      !u.direccion.direccion_texto ||
      !u.direccion.calle ||
      u.direccion.numero === null || u.direccion.numero === undefined ||
      !u.direccion.comuna ||
      !u.direccion.region ||
      !u.direccion.codigo_postal ||
      u.direccion.latitud === null || u.direccion.latitud === undefined ||
      u.direccion.longitud === null || u.direccion.longitud === undefined ||
      !u.mdl_correo_electronico ||
      u.mdl_telefono === null || u.mdl_telefono === undefined ||
      u.mdl_tipo_usuario === null || u.mdl_tipo_usuario === undefined ||
      !u.mdl_contrasena ||
      !u.mdl_confirmarContrasena
    ) {
      this.presentAlert('Error', 'Todos los campos son obligatorios');
      return;
    }
    

    if (u.mdl_contrasena !== u.mdl_confirmarContrasena) {
      this.presentAlert('Error', 'Las contraseñas no coinciden');
      return;
    }

    const fechaNacimientoStr = u.mdl_fecha_nacimiento.split('T')[0]; // "2025-04-01"
    const [year, month, day] = fechaNacimientoStr.split('-').map(Number);
    const fechaConvertida = new Date(Date.UTC(year, month - 1, day)); // Hora cero en UTC
    try {
      await this.api.registrar_usuario(
        u.mdl_nombres,
        u.mdl_apellidos,
        fechaConvertida,
        u.mdl_correo_electronico,
        u.mdl_telefono,
        u.mdl_tipo_usuario,
        u.mdl_contrasena,
        u.direccion 
      ).toPromise();

      this.presentAlert('Éxito', 'Usuario creado correctamente');
      this.limpiarFormulario();

    } catch (error: any) {
      // 🟡 Captura mensaje de error detallado desde la API
      console.error('Error completo:', error);
  
      let mensaje = 'Ocurrió un error inesperado';
  
      // Si el backend manda un mensaje más claro, lo mostramos
      if (error?.error?.detail) {
        mensaje = error.error.detail;
      } else if (error?.message) {
        mensaje = error.message;
      } else if (typeof error === 'string') {
        mensaje = error;
      }
  
      //this.presentAlert('Error', mensaje);
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  limpiarFormulario() {
    this.usuario = {
      mdl_nombres: '',
      mdl_apellidos: '',
      mdl_fecha_nacimiento: '',
      direccion: {
        direccion_texto: '',
        calle: '',
        numero: 0,
        adicional: '',
        comuna: '',
        region: '',
        codigo_postal: '',
        latitud: 0,
        longitud: 0
      },
      mdl_correo_electronico: '',
      mdl_telefono: 0,
      mdl_tipo_usuario: 0,
      mdl_contrasena: '',
      mdl_confirmarContrasena: ''
    };
  }

}
