# Define los esquemas de entrada y salida utilizando Pydantic para validaciones.
# Creado por david el 15/04

from pydantic import BaseModel, field_validator
from typing import Optional
from datetime import date


#clases para mostrar el usuario con direccion (prueba)
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

####################################################################################################

#esquemas para registrar usuario
#creado por david el 17/04
class DireccionCreate(BaseModel):
    direccion_texto: str
    calle: str
    numero: int
    adicional: Optional[str]
    comuna: str
    region: str
    codigo_postal: str
    latitud: float
    longitud: float

    #validador de string vacio
    @field_validator('direccion_texto', 'calle', 'comuna', 'region', 'codigo_postal')
    def no_string_vacio(cls, v, info):
        if not v or not v.strip():
            raise ValueError(f"El campo '{info.field_name}' no puede estar vacío")
        return v


class UsuarioCreate(BaseModel):
    nombres: str
    apellidos: str
    fecha_nacimiento: date
    correo: str
    telefono: int
    tipo_usuario: int
    contrasena: str
    direccion: DireccionCreate

    @field_validator('nombres', 'apellidos', 'correo', 'contrasena')
    def no_string_vacio(cls, v, info):
        if not v or not v.strip():
            raise ValueError(f"El campo '{info.field_name}' no puede estar vacío")
        return v
