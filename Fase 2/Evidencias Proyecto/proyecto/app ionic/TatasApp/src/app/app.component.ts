import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { environmentLocal } from './config.local';
import { ZonaSeguraService } from './services/zona-segura.service'; // Asegúrate que la ruta sea correcta

declare var OneSignal: any;

// Función para cargar Google Maps dinámicamente
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
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {

  constructor(private zonaSeguraService: ZonaSeguraService) {}

  ngOnInit() {
    // Cargar Google Maps
    loadGoogleMaps(environmentLocal.googleMapsApiKey);

    // Inicializar OneSignal
    try {
      OneSignal.setAppId(environmentLocal.oneSignalAppId);

      OneSignal.getDeviceState().then((state: any) => {
        const playerId = state?.userId;
        if (playerId) {
          console.log("Player ID:", playerId);
          localStorage.setItem('player_id', playerId);
        } else {
          console.warn("No se pudo obtener el Player ID.");
        }
      });

      document.addEventListener('notificationOpened', (event: any) => {
        console.log("Notificación abierta:", event);
      });

    } catch (error) {
      console.error("Error al inicializar OneSignal:", error);
    }

    // Iniciar verificación de zona segura en segundo plano
    this.zonaSeguraService.iniciarVerificacion();
  }
}
