import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { DbOffService } from 'src/app/services/db-off.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PrincipalPage implements OnInit {

  constructor(
    private dbOff: DbOffService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  //borrar registros en la tabla local usuario
  //creado por david el 23/04
  async borrarUsuarioLogueado() {
    await this.dbOff.borrarUsuarioLogueado();
  }

  //metodo para cerrar sesion
  //creado por david el 23/04
  async cerrarSesion() {
    let extras: NavigationExtras = {replaceUrl: true}

    await this.borrarUsuarioLogueado(); //borrar los datos de la tabla

    this.router.navigate(["login"], extras);
  }

}
