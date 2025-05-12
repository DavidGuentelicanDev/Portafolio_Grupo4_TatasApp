//creado por Ale - Mostrar registro alarma adulto mayor asociado

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { ZonaSeguraService } from '../../services/zona-segura.service';
import { DbOffService } from '../../services/db-off.service';
import { IonList, IonItem, IonLabel } from "@ionic/angular/standalone";
import { SosService } from 'src/app/services/sos.service';
import { ApiAlertasService } from 'src/app/services/api-alertas.service';

@Component({
  selector: 'app-registro-alarmas',
  templateUrl: './registro-alarmas.page.html',
  styleUrls: ['./registro-alarmas.page.scss'],
  imports: [IonItem, IonList, IonLabel, CommonModule],
})
export class RegistroAlarmasPage implements OnInit {
  alertas: any[] = [];
  tipoAlertas: { [key: number]: string } = {
    1: "Zona Segura",
    2: "Inactividad",
    3: "Caída",
    4: "SOS"
  };
  cargando: boolean = true;

  constructor(
    private zonaSegura: ZonaSeguraService,
    private dbOffService: DbOffService,
    private alertController: AlertController,
    private sos: SosService,
    private apiAlertas: ApiAlertasService
  ) {}

  async ngOnInit() {
    console.log("TATAS: Iniciando ngOnInit...");

    try {
      const usuario = await this.dbOffService.obtenerDatosUsuarioLogueado();
      console.log("TATAS: Usuario obtenido desde DB local:", usuario);

      if (!usuario) {
        console.warn("TATAS: No se encontró usuario logueado.");
        await this.mostrarAlerta('Error', 'No se encontró usuario logueado.');
        this.cargando = false;
        return;
      }

      if (usuario.tipo_usuario !== 2) {
        console.warn("TATAS: Usuario no es familiar. Tipo:", usuario.tipo_usuario);
        await this.mostrarAlerta('Acceso restringido', 'Esta página solo está disponible para usuarios familiares.');
        this.cargando = false;
        return;
      }

      const idFamiliar = Number(usuario.id_usuario);
      console.log("TATAS: ID del familiar:", idFamiliar);

      const res: any = await this.apiAlertas.getAlertasPorFamiliar(idFamiliar);
      console.log("TATAS: Respuesta de alertas recibida:", res);

      this.alertas = res || [];
      console.log("TATAS: Alertas asignadas al array:", this.alertas);

    } catch (err) {
      console.error("TATAS: Error al cargar alertas:", err);
      await this.mostrarAlerta('Error', 'No se pudieron cargar las alertas.');
    } finally {
      this.cargando = false;
      console.log("TATAS: Finalizó ngOnInit, cargando:", this.cargando);
    }
  }

  getNombreTipoAlerta(tipo: number): string {
    return this.tipoAlertas[tipo] || 'Alerta';
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alerta = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alerta.present();
    console.log("TATAS: Alerta mostrada:", titulo, mensaje);
  }
}
