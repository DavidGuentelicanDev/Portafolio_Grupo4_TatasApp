export interface FamiliarRegistrado {
    id_usuario: number;
    telefono: string;
  }
  
  export interface ContactoAPI {
    nombre: string;
    telefono: string;
  }
  
  export interface RespuestaContactosAPI extends FamiliarRegistrado {
    contactos: ContactoAPI[];
  }
  