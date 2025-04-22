import { Injectable } from '@angular/core';
//importar para la definicion de la DB
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbOffService {

  //definir una instancia de la db para poder inicializarla en nulo
  dbInstancia: SQLiteObject | null = null;

  constructor(
    private sqlite: SQLite
  ) { }

  //abrir la instancia de db local
  async abrirDB() {
    try {
      this.dbInstancia = await this.sqlite.create({
        name: "datos.db",
        location: "default"
      });
      console.log("tatas: BASE DE DATOS LOCAL OK");
    } catch (e) {
      console.log("tatas: PROBLEMA AL INICIAR LA DB LOCAL: ", JSON.stringify(e));
    }
  }

  //crear tabla usuario
  async crearTablaUsuario() {
    await this.abrirDB();

    try {
      await this.dbInstancia?.executeSql("CREATE TABLE IF NOT EXISTS USUARIO (ID_USUARIO INTEGER, NOMBRES VARCHAR(50), TIPO_USUARIO INTEGER, TOKEN VARCHAR(100))", []);
      console.log("tatas: TABLA USUARIO CREADA/INICIADA OK");
    } catch (e) {
      console.log("tatas: PROBLEMA AL CREAR/INICIAR TABLA USUARIO: ", JSON.stringify(e));
    }
  }

}
