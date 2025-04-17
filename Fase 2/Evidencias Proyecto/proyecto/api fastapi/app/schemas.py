# Define los esquemas de entrada y salida utilizando Pydantic para validaciones.
# Creado por david el 15/04

from pydantic import BaseModel
from typing import Optional
from datetime import date


#classes para mostrar el usuario con direccion (prueba)
#creada por david el 16/04

class DireccionOut(BaseModel):
    direccion_texto: str
    calle: str
    numero: int
    adicional: Optional[str]
    comuna: str
    region: str
    codigo_postal: str
    latitud: float
    longitud: float

    class Config:
        from_attributes = True

class UsuarioOut(BaseModel):
    nombres: str
    apellidos: str
    fecha_nacimiento: date
    correo: str
    telefono: int
    tipo_usuario_str: str #cambiado para mostrar el nombre del tipo_usuario
    foto_perfil: Optional[str]
    direccion_rel: DireccionOut

    class Config:
        from_attributes = True
