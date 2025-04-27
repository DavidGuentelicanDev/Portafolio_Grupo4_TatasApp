import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { DbOffService } from 'src/app/services/db-off.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SplashPage implements OnInit {

  //token registrado
  tokenRegistrado: string = "";

  constructor(
    private dbOff: DbOffService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.dbOff.abrirDB(); //habilita la base de datos
    this.dbOff.crearTablaUsuario(); //crea o valida tabla usuario
    this.tokenRegistrado = ""; //vaciar por seguridad

    //validar que haya token de usuario registrado
    //creado por david el 23/04
    let usuario = await this.dbOff.obtenerTokenUsuarioLogueado();

    if (usuario) {
      //si hay token navega al principal
      this.tokenRegistrado = usuario.token;
      console.log("tatas: token registrado ", this.tokenRegistrado);
      setTimeout(() => {
        this.navegarPrincipal();
      }, 1500);
    } else {
      //si no hay token navega al login
      console.log("tatas: no hay token registrado");
      setTimeout(() => {
        this.navegarLogin();
      }, 1500);
    }
  }

  //funcion para navegar al login
  //creada por david el 23/04
  navegarLogin() {
    let extras: NavigationExtras = {replaceUrl: true};
    this.router.navigate(["login"], extras);
  }

  //funcion para navegar al principal
  //creada por david el 23/04
  navegarPrincipal() {
    let extras: NavigationExtras = {replaceUrl: true};
    this.router.navigate(["dashboard-prueba"], extras);
  }

}
