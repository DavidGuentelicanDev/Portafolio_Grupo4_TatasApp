import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { environmentLocal } from './config.local';
import { ZonaSeguraService } from './services/zona-segura.service';

//funcion para poder cargar la api de google maps
export function loadGoogleMaps(apiKey: string) {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
  script.defer = true;
  script.async = true;

  script.onerror = () => {
    console.error("Error al cargar Google Maps");
  };

  document.head.appendChild(script);
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {

  constructor(
    private zonaSegura: ZonaSeguraService
  ) {}

  ngOnInit() {
    loadGoogleMaps(environmentLocal.googleMapsApiKey); //carga la api de google maps
    this.zonaSegura.iniciarVerificacion(); //inicia la verificacion de la zona segura en segundo plano
  }

}
