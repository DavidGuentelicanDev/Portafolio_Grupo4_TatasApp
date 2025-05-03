// Servicio para verificar zona segura y enviar alerta push si se sale de ella
// Creado por Ale - actualizado 03/05/2025

import { Injectable, inject } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { DbOffService } from '../services/db-off.service';
import { ApiUsuariosService } from '../services/api-usuarios.service';
import { HttpClient } from '@angular/common/http';
import { environmentLocal } from '../config.local';

declare var google: any;

@Injectable({ providedIn: 'root' })
export class ZonaSeguraService {
  private dbOff = inject(DbOffService);
  private apiUsuario = inject(ApiUsuariosService);
  private http = inject(HttpClient);

  private id_usuario: number = 0;
  private direccionUsuario: string = '';

  iniciarVerificacion() {
    setInterval(async () => {
      try {
        const usuario = await this.dbOff.obtenerDatosUsuario();
        if (!usuario) {
          console.error("No se encontraron datos del usuario.");
          return;
        }

        this.id_usuario = usuario.id_usuario;

        const datosUsuario: any = await this.http
          .get(`${environmentLocal.URLbase}/usuarios/${this.id_usuario}`)
          .toPromise();

        this.direccionUsuario = datosUsuario?.direccion_rel?.direccion_texto;
        if (!this.direccionUsuario) throw new Error("Dirección no encontrada");

        const zonaSegura = await this.obtenerCoordenadasDesdeDireccion(this.direccionUsuario);

        const currentPosition = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });

        const actual = {
          lat: currentPosition.coords.latitude,
          lng: currentPosition.coords.longitude,
        };

        this.compararDistancia(actual, zonaSegura);
      } catch (e) {
        console.error("Error al verificar zona segura:", e);
      }
    }, 5 * 60 * 1000); // cada 5 minutos
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

  async compararDistancia(actual: { lat: number, lng: number }, zona: { lat: number, lng: number }) {
    const distancia = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(actual.lat, actual.lng),
      new google.maps.LatLng(zona.lat, zona.lng)
    );

    if (distancia > 100) {
      const mensaje = `Alerta: el adulto mayor salió de la zona segura a ${distancia.toFixed(0)} metros.`;
      const urlUbicacion = `https://www.google.com/maps?q=${actual.lat},${actual.lng}`;

      await this.enviarAlerta(actual.lat, actual.lng, urlUbicacion);
      await this.hablar(mensaje);
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
      console.error('Error al enviar alerta al backend:', err);
    }
  }

  async hablar(mensaje: string) {
    await TextToSpeech.speak({
      text: mensaje,
      lang: 'es-ES',
      rate: 1.0
    });
  }
}
