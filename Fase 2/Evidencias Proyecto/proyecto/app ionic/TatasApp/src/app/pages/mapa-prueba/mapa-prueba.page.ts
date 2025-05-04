import { Component, AfterViewInit, ViewChild, ElementRef, inject } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController, IonicModule } from '@ionic/angular';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { CommonModule } from '@angular/common';
import { environmentLocal } from 'src/app/config.local';
import { ApiUsuariosService } from 'src/app/services/api-usuarios.service';
import { DbOffService } from 'src/app/services/db-off.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare var google: any;

@Component({
  selector: 'app-mapa-prueba',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './mapa-prueba.page.html',
  styleUrls: ['./mapa-prueba.page.scss'],
})
export class MapaPruebaPage implements AfterViewInit {

  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  map: any;
  direccionUsuario: string = '';
  id_usuario: number = 0;

  // Inyección de servicios
  private alertController = inject(AlertController);
  private apiUsuario = inject(ApiUsuariosService);
  private dbOff = inject(DbOffService);
  private http = inject(HttpClient);

  async ngAfterViewInit() {
    try {
      // Obtener ID usuario logueado desde SQLite
      const usuario = await this.dbOff.obtenerDatosUsuario();
      if (!usuario) {
        console.error("No se encontraron datos del usuario.");
        return; // o podrías redirigir al login
      }
      
      this.id_usuario = usuario.id_usuario;

      // Obtener dirección del usuario desde la API
      const datosUsuario: any = await this.http
        .get(`${environmentLocal.URLbase}/usuarios/${this.id_usuario}`)
        .toPromise();

      this.direccionUsuario = datosUsuario?.direccion_rel?.direccion_texto;
      if (!this.direccionUsuario) throw new Error("Dirección no encontrada");

      // Obtener coordenadas de la dirección
      const zonaSegura = await this.obtenerCoordenadasDesdeDireccion(this.direccionUsuario);

      // Obtener ubicación actual
      const currentPosition = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
      const currentLatLng = {
        lat: currentPosition.coords.latitude,
        lng: currentPosition.coords.longitude,
      };

      this.inicializarMapa(currentLatLng, zonaSegura);
      this.compararDistancia(currentLatLng, zonaSegura);

    } catch (error) {
      console.error('Error general:', error);
      this.mostrarAlerta('Error', 'No se pudo obtener la ubicación o dirección del usuario.');
    }
  }

  async obtenerCoordenadasDesdeDireccion(direccion: string): Promise<{ lat: number, lng: number }> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direccion)}&key=${environmentLocal.googleMapsApiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.status === 'OK') {
      return data.results[0].geometry.location;
    } else {
      throw new Error('Error al geocodificar la dirección: ' + data.status);
    }
  }

  inicializarMapa(actual: { lat: number, lng: number }, zona: { lat: number, lng: number }) {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: actual,
      zoom: 18
    });

    new google.maps.Marker({
      position: actual,
      map: this.map,
      title: 'Tu ubicación',
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });

    new google.maps.Circle({
      strokeColor: '#00FF00',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#00FF00',
      fillOpacity: 0.35,
      map: this.map,
      center: zona,
      radius: 100
    });

    new google.maps.Marker({
      position: zona,
      map: this.map,
      title: 'Zona Segura',
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });
  }

  async compararDistancia(actual: { lat: number, lng: number }, zona: { lat: number, lng: number }) {
    const distancia = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(actual.lat, actual.lng),
      new google.maps.LatLng(zona.lat, zona.lng)
    );

    if (distancia > 100) {
      const mensaje = `¡Alerta! Estás fuera de la zona segura. Distancia: ${distancia.toFixed(0)} metros.`;
      const urlUbicacion = `https://www.google.com/maps?q=${actual.lat},${actual.lng}`;
      await this.enviarAlerta(actual.lat, actual.lng, urlUbicacion);
      await this.hablar(mensaje);
      this.mostrarAlerta('Fuera de la zona segura', mensaje);
    } else {
      console.log('Dentro de la zona segura');
    }
  }

  async enviarAlerta(lat: number, lng: number, url: string) {
    const alerta = {
      usuario_id: this.id_usuario,
      ubicacion: url,
      mensaje: 'El adulto mayor ha salido de la zona segura.',
      tipo_alerta: 1
    };

    try {
      await this.http.post(`${environmentLocal.URLbase}/alertas/crear`, alerta).toPromise();
    } catch (err) {
      console.error('Error al enviar alerta:', err);
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async hablar(mensaje: string) {
    await TextToSpeech.speak({
      text: mensaje,
      lang: 'es-ES',
      rate: 1.0
    });
  }



  
}

