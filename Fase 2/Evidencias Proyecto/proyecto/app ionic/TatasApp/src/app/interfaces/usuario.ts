import { Direccion } from "./direccion";

export interface Usuario {
    mdl_nombres: string;
    mdl_apellidos: string;
    mdl_fecha_nacimiento: string; // Si prefieres, puedes usar `Date`, pero como lo ingresas desde un input tipo string, este es más flexible.
    mdl_correo_electronico: string;
    mdl_telefono: string;
    mdl_tipo_usuario: number;
    mdl_contrasena: string;
    mdl_confirmarContrasena: string;
    direccion: Direccion;
}

//interfaz para login
//creado por david el 20/04
export interface UsuarioLogin {
    correo: string;
    contrasena: string;
}

//interfaz para la respuesta de login exitoso
//creado por david el 21/04
export interface UsuarioLoginExitoso {
    id_usuario: number
    nombres: string
    tipo_usuario: number
    token: string
}
