import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ZonaSeguraService } from '../../services/zona-segura.service';
import { DbOffService } from '../../services/db-off.service';

@Component({
  selector: 'app-registro-alarmas',
  templateUrl: './registro-alarmas.page.html',
  styleUrls: ['./registro-alarmas.page.scss'],
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
    private alertaService: ZonaSeguraService,
    private dbOffService: DbOffService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    try {
      const usuario = await this.dbOffService.obtenerDatosUsuario();

      if (usuario?.tipo_usuario !== 2) {
        this.mostrarAlerta('Acceso restringido', 'Esta página solo está disponible para usuarios familiares.');
        this.cargando = false;
        return;
      }

      const res: any = await this.alertaService.getAlertasPorFamiliar(usuario.id_usuario);
      this.alertas = res.data || [];
    } catch (err) {
      console.error('Error al cargar alertas:', err);
      this.mostrarAlerta('Error', 'No se pudieron cargar las alertas.');
    } finally {
      this.cargando = false;
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
  }
}
