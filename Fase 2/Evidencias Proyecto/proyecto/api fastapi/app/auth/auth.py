# Contiene la lógica de login, verificación de credenciales y creación de tokens JWT.
# Creado por david el 15/04

from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.models import Usuario
from app.auth.hashing import verificar_contrasena
from app.schemas import RespuestaLoginErronea


#autentificacion de usuario
#creada por david el 20/04
def autentificar_usuario(db: Session, correo: str, contrasena: str) -> Usuario:
    #buscar usuario por correo
    usuario = db.query(Usuario).filter(Usuario.correo == correo).first()

    #si usuario no existe o no coincide con la contraseña: error
    if not usuario or not verificar_contrasena(contrasena, usuario.contrasena):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=RespuestaLoginErronea().model_dump()
        )

    #si todo esta bien, devuelve el usuario
    return usuario
