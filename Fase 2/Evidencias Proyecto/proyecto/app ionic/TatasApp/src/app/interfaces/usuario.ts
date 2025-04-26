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
