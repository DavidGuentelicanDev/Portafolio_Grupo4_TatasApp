import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { environmentLocal } from './config.local';


declare var OneSignal: any;

export function loadGoogleMaps(apiKey: string) {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
  script.defer = true;
  script.async = true;
  document.head.appendChild(script);
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    // Cargar Google Maps
    loadGoogleMaps(environmentLocal.googleMapsApiKey);

    // Inicializar OneSignal
    OneSignal.setAppId(environmentLocal.oneSignalAppId);


    // Obtener el player_id del dispositivo
    OneSignal.getDeviceState().then((state: any) => {
      const playerId = state.userId;
      console.log("Player ID:", playerId);
      localStorage.setItem('player_id', playerId || '');
    });

    // Escuchar apertura de notificaciones
    document.addEventListener('notificationOpened', (event: any) => {
      console.log("Notificación abierta:", event);
    });
  }
}
