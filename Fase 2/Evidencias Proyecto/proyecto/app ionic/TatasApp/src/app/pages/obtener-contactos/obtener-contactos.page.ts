import { Component } from '@angular/core';
import { Contacts, ContactFieldType } from '@awesome-cordova-plugins/contacts/ngx';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ApiFamiliaresService } from 'src/app/services/api-familiares.service';
import { lastValueFrom } from 'rxjs';
import { FamiliarRegistrado } from 'src/app/interfaces/familiar';

@Component({
  selector: 'app-obtener-contactos',
  standalone: true,
  imports: [CommonModule, IonicModule],
  providers: [Contacts],
  templateUrl: './obtener-contactos.page.html',
  styleUrls: ['./obtener-contactos.page.scss'],
})
export class ObtenerContactosPage {

  // Contactos del teléfono
  contactos: { nombre: string; numero: string }[] = [];

  // Contactos que coinciden entre teléfono y API
  contactosCoincidentes: { nombre: string; numero: string }[] = [];

  // Solo necesitamos los teléfonos de la API
  contactosApi: { nombre: string; telefono: string }[] = [];

  constructor(
    private contacts: Contacts,
    private apiFamiliares: ApiFamiliaresService
  ) {}

  // Obtiene contactos del teléfono y normaliza números
  async obtenerContactos() {
    const fields: ContactFieldType[] = ['displayName', 'phoneNumbers'];

    try {
      const encontrados = await this.contacts.find(fields, { multiple: true });

      this.contactos = encontrados
        .map(c => ({
          nombre: c.displayName || 'Sin nombre',
          numero: c.phoneNumbers && c.phoneNumbers.length && c.phoneNumbers[0].value
            ? this.normalizarNumero(c.phoneNumbers[0].value)
            : ''
        }))
        .filter(c => c.numero !== '')
        .sort((a, b) => a.nombre.localeCompare(b.nombre)); // Orden alfabético

    } catch (error) {
      console.error('Error al obtener contactos del teléfono:', error);
    }
  }

  // Obtiene teléfonos registrados desde la API (como arreglo)
  async obtenerContactosApi() {
    try {
      const data: FamiliarRegistrado[] = await lastValueFrom(
        this.apiFamiliares.obtenerContactosFamiliar()
      );

      this.contactosApi = data.map(contacto => ({
        nombre: '', // No viene nombre, opcional
        telefono: this.normalizarNumero(contacto.telefono)
      }));
    } catch (error) {
      console.error('Error al obtener contactos desde la API:', error);
    }
  }

  // Compara y guarda solo los contactos que coinciden por número
  compararContactos() {
    const telefonosApi = new Set(this.contactosApi.map(c => c.telefono));
    this.contactosCoincidentes = this.contactos.filter(c => telefonosApi.has(c.numero));
  }

  // Ejecuta toda la lógica al presionar el botón
  async obtenerCoincidencias() {
    await this.obtenerContactos();
    await this.obtenerContactosApi();
    this.compararContactos();
  }

  // Normaliza números quitando +56 y símbolos
  private normalizarNumero(numero: string): string {
    let numeroNormalizado = numero.replace(/\D/g, '');
    if (numeroNormalizado.startsWith('56')) {
      numeroNormalizado = numeroNormalizado.substring(2);
    }
    return numeroNormalizado;
  }
}
