import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
//importaciones para la api
import { ApiPruebaService } from 'src/app/services/api-prueba.service'; //(importacion para pruebas de la api)
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-prueba-api',
  templateUrl: './prueba-api.page.html',
  styleUrls: ['./prueba-api.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PruebaApiPage implements OnInit {

  constructor(
    private apiPrueba: ApiPruebaService, //dependencia para el servicio de prueba de la api (solo para pruebas de conexion)
  ) { }

  ngOnInit() {
    //ruta raiz de la api
    this.apiPrueba.obtenerRutaRaiz().subscribe({
      next: (res) => console.log('tatas: Respuesta de API:', JSON.stringify(res, null, 2)),
      error: (err) => console.log('tatas: Error detallado:', JSON.stringify(err, null, 2))
    });

  }

}
