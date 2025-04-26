import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { environmentLocal } from './config.local';

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
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    loadGoogleMaps(environmentLocal.googleMapsApiKey);
  }

}
