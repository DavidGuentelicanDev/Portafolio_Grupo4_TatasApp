//interfaces para comparacion de contactos y usuarios tipo familiar registrados
//creado por ale el 25/04

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
