import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { ApiUsuariosService } from 'src/app/services/api-usuarios.service';
import { lastValueFrom } from 'rxjs';
import { UsuarioLogin, UsuarioLoginExitoso } from 'src/app/interfaces/usuario';
import { DbOffService } from 'src/app/services/db-off.service';
import { NavigationExtras, Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonItem, IonContent, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginPage implements OnInit {

  //lista para usar la interfaz para login
  //creado por david el 20/04
  mdl_usuario: UsuarioLogin = {
    correo: "",
    contrasena: ""
  };

  //lista para agregar datos de usuario logueado
  //creado por david el 21/04
  db_loginExitoso: UsuarioLoginExitoso = {
    id_usuario: 0,
    nombres: "",
    tipo_usuario: 0,
    token: ""
  };

  constructor(
    private apiUsuario: ApiUsuariosService,
    private dbOff: DbOffService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {}

  //navegar a principal
  //creado por david el 22/04
  navegarPrincipal() {
    let extras: NavigationExtras = {replaceUrl: true};
    this.router.navigate(["principal"], extras);
  }

  //funcion para guardar los datos de usuario
  //creado por david el 22/04
  async guardarDatosUsuario() {
    await this.dbOff.guardarDatosLogueoExitoso(
      this.db_loginExitoso.id_usuario,
      this.db_loginExitoso.nombres,
      this.db_loginExitoso.tipo_usuario,
      this.db_loginExitoso.token
    );
  }

  //funcion de login
  //creado por david el 20/04
  async login() {
    //validando campos vacios
    if (!this.mdl_usuario.correo || !this.mdl_usuario.contrasena) {
      this.presentAlert('Error', 'Debes ingresar un usuario y/o una contraseña válidos');
      return;
    }

    //loading de carga
    let loading = await this.loadingController.create({
      message: 'Validando credenciales...',
      spinner: 'crescent',
      backdropDismiss: false,
    });
    await loading.present();

    //enviando los datos
    let datos = this.apiUsuario.login(this.mdl_usuario.correo, this.mdl_usuario.contrasena);
    let respuesta = await lastValueFrom(datos);
    let json_texto = JSON.stringify(respuesta);
    let json = JSON.parse(json_texto);

    loading.dismiss(); //se desactiva el loading

    //validando respuestas
    if (json.status == "error") {
      console.log("tatas: ", json.message);
      this.presentAlert("Error", "Usuario y/o contraseña incorrectos. Intenta nuevamente");
      return;
    } else if (json.status == "success") {
      console.log("tatas: ", json.message);

      //alerta de login exitoso
      let alertaExito = await this.alertController.create({
        header: "Éxito",
        message: "Ingresando a la App...",
        backdropDismiss: false
      });
      await alertaExito.present();

      //guardar datos en la lista
      this.db_loginExitoso.id_usuario = json.contenido.id_usuario;
      this.db_loginExitoso.nombres = json.contenido.nombres;
      this.db_loginExitoso.tipo_usuario = json.contenido.tipo_usuario;
      this.db_loginExitoso.token = json.contenido.token;

      this.guardarDatosUsuario(); //guardando los datos en tabla usuario
      setTimeout(() => {
        alertaExito.dismiss(); //desaparece alert de login exitoso antes de navegar al principal
        this.navegarPrincipal(); //navegar a la pagina principal
      }, 750);
    }
  }

  //metodo para navegar al registro
  //creado por andrea el 30/04
  navegarRegistrar() {
    this.router.navigate(["registrar"]);
  }

  //metodo para mostrar alertas a respuestas del login
  //creado por andrea el 30/04
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
