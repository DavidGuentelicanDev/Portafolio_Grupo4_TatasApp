# Define las rutas principales de la API y agrupa los endpoints por funcionalidades.
# Creado por david el 15/04

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.dependencies import get_db
from app.models import Usuario
from app.schemas import UsuarioOut
from typing import List


usuarios_router = APIRouter(prefix="/usuarios", tags=["Usuarios"]) #direccion por defecto de todas las rutas de usuarios


#ruta de prueba para usuarios
#creada por david el 16/04
@usuarios_router.get("/", response_model=List[UsuarioOut])
def obtener_usuarios(db: Session = Depends(get_db)):
    usuarios = db.query(Usuario).all()
    return usuarios
