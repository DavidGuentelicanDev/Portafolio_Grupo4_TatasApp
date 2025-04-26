import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

//importacion para apis
import { provideHttpClient } from '@angular/common/http';

//importacion de sqlite
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), //inyectar para poder usar la api
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    SQLite,
  ],
});
