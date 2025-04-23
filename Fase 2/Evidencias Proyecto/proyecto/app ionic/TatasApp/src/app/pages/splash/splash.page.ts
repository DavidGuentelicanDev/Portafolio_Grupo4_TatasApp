import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { DbOffService } from 'src/app/services/db-off.service';

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
    private dbOff: DbOffService
  ) { }

  async ngOnInit() {
    this.dbOff.abrirDB();
    this.dbOff.crearTablaUsuario();

    //validar que haya token de usuario registrado
    //creado por david el 23/04
    let usuario = await this.dbOff.obtenerDatosUsuarioLogueado();

    if (usuario) {
      this.tokenRegistrado = usuario.token;
      console.log("tatas: token registrado ", this.tokenRegistrado);
    } else {
      console.log("tatas: no hay token registrado");
    }
  }


  // navegarLogin() {

  // }

}
