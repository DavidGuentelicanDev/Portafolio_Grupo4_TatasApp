import { Direccion } from "./direccion";

export interface Usuario {
    mdl_nombres: string;
    mdl_apellidos: string;
    mdl_fecha_nacimiento: string; // Si prefieres, puedes usar `Date`, pero como lo ingresas desde un input tipo string, este es más flexible.
    mdl_correo_electronico: string;
    mdl_telefono: number | null;
    mdl_tipo_usuario: number;
    mdl_contrasena: string;
    mdl_confirmarContrasena: string;
    direccion: Direccion;
  }