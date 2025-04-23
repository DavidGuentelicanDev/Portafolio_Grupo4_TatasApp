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
  //creado por david el 21/04
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
  //creado por david el 21/04
  async crearTablaUsuario() {
    await this.abrirDB();

    try {
      await this.dbInstancia?.executeSql("CREATE TABLE IF NOT EXISTS USUARIO (ID_USUARIO INTEGER, NOMBRES VARCHAR(50), TIPO_USUARIO INTEGER, TOKEN VARCHAR(300))", []);
      console.log("tatas: TABLA USUARIO CREADA/INICIADA OK");
    } catch (e) {
      console.log("tatas: PROBLEMA AL CREAR/INICIAR TABLA USUARIO: ", JSON.stringify(e));
    }
  }

  //guardar datos de usuario logueado
  //creado por david el 22/04
  async guardarDatosLogueoExitoso(id: number, nombres: string, tipo_usuario: number, token: string) {
    await this.abrirDB();

    try {
      await this.dbInstancia?.executeSql("INSERT INTO USUARIO VALUES(?, ?, ?, ?)", [id, nombres, tipo_usuario, token]);
      console.log("tatas USUARIO LOGUEADO: ", id, nombres, tipo_usuario, token);
    } catch (e) {
      console.log("tatas: PROBLEMA AL REGISTRAR DATOS DE USUARIO", JSON.stringify(e));
    }
  }

  //obtener el token del usuario logueado
  //creado por david el 22/04
  async obtenerTokenUsuarioLogueado() {
    await this.abrirDB();

    try {
      let data = await this.dbInstancia?.executeSql("SELECT TOKEN FROM USUARIO", []);

      //si hay mas de una fila con resultados devuelve los datos
      if (data?.rows.length > 0) {
        return {token: data.rows.item(0).TOKEN};
      }
      return null;
    } catch (e) {
      console.log('tatas: ', JSON.stringify(e));
      return null;
    }
  }

}
