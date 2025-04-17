# Define las rutas principales de la API y agrupa los endpoints por funcionalidades.
# Creado por david el 15/04

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.services.dependencies import get_db
from app.models import Usuario, Direccion
from app.schemas import UsuarioOut, UsuarioCreate
from app.auth.hashing import get_hash_contrasena
from typing import List


usuarios_router = APIRouter(prefix="/usuarios", tags=["Usuarios"]) #direccion por defecto de todas las rutas de usuarios


#ruta de prueba para usuarios
#creada por david el 16/04
@usuarios_router.get("/", response_model=List[UsuarioOut])
def obtener_usuarios(db: Session = Depends(get_db)):
    usuarios = db.query(Usuario).all()

    #se construye la respuesta agregando tipo_usuario_str a cada usuario
    usuarios_out = []
    for usuario in usuarios:
        usuario_dict = UsuarioOut(
            nombres=usuario.nombres,
            apellidos=usuario.apellidos,
            fecha_nacimiento=usuario.fecha_nacimiento,
            correo=usuario.correo,
            telefono=usuario.telefono,
            tipo_usuario_str=usuario.tipo_usuario_nombre,
            foto_perfil=usuario.foto_perfil,
            direccion_rel=usuario.direccion_rel
        )
        usuarios_out.append(usuario_dict)

    return usuarios_out

#########################################################################################################

#ruta para registrar usuario
#creada por david el 17/04
@usuarios_router.post("/registro_usuario", response_model=UsuarioOut, status_code=status.HTTP_201_CREATED)
def registrar_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    #verifica si ya existe usuario con ese correo o telefono
    if db.query(Usuario).filter(Usuario.correo == usuario.correo).first():
        raise HTTPException(status_code=400, detail="Correo ya registrado")
    if db.query(Usuario).filter(Usuario.telefono == usuario.telefono).first():
        raise HTTPException(status_code=400, detail="Teléfono ya registrado")

    try:
        #crear direccion
        nueva_direccion = Direccion(**usuario.direccion.dict())
        db.add(nueva_direccion)
        db.commit()
        db.refresh(nueva_direccion)

        #hashear la contraseña
        contrasena_hasheada = get_hash_contrasena(usuario.contrasena)

        #crear usuario
        nuevo_usuario = Usuario(
            nombres=usuario.nombres,
            apellidos=usuario.apellidos,
            fecha_nacimiento=usuario.fecha_nacimiento,
            direccion_id=nueva_direccion.id,
            correo=usuario.correo,
            telefono=usuario.telefono,
            tipo_usuario=usuario.tipo_usuario,
            contrasena=contrasena_hasheada #se guarda la contraseña hasheada
        )
        db.add(nuevo_usuario)
        db.commit()
        db.refresh(nuevo_usuario)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Error al registrar usuario: {str(e)}"
        )

    #construye y retorna la respuesta json
    return JSONResponse(
        status_code=201,
        content={
            "status": "success",
            "message": "Usuario registrado correctamente"
        }
    )
