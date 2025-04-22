import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { ApiUsuariosService } from 'src/app/services/api-usuarios.service';
import { lastValueFrom } from 'rxjs';
import { UsuarioLogin, UsuarioLoginExitoso } from 'src/app/interfaces/usuario';
import { DbOffService } from 'src/app/services/db-off.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  //lista para usar la interfaz
  mdl_usuario: UsuarioLogin = {
    correo: "",
    contrasena: ""
  };

  //lista para agregar datos de usuario logueado
  db_loginExitoso: UsuarioLoginExitoso = {
    id_usuario: 0,
    nombres: "",
    tipo_usuario: 0,
    token: ""
  };

  constructor(
    private apiUsuario: ApiUsuariosService,
    private dbOff: DbOffService
  ) { }

  ngOnInit() {
    //ruta raiz de la api
    this.apiUsuario.obtenerRutaRaiz().subscribe({
      next: (res) => console.log('tatas: Respuesta de API:', JSON.stringify(res, null, 2)),
      error: (err) => console.log('tatas: Error detallado:', JSON.stringify(err, null, 2))
    });

    //iniciar tablas
    this.dbOff.abrirDB();
    this.dbOff.crearTablaUsuario();
  }

  async login() {
    //enviando los datos
    let datos = this.apiUsuario.login(this.mdl_usuario.correo, this.mdl_usuario.contrasena);
    let respuesta = await lastValueFrom(datos);
    let json_texto = JSON.stringify(respuesta);
    console.log("tatas: " + json_texto);
    let json = JSON.parse(json_texto);
    console.log("tatas: " + json.status);
  }

}
