# Define los esquemas de entrada y salida utilizando Pydantic para validaciones.
# Creado por david el 15/04

from pydantic import BaseModel
from typing import Optional
from datetime import date
from app.utils.helpers import (
    validador_no_string_vacio,
    validador_contrasena,
    validador_formato_correo,
    validador_formato_telefono
)


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

min_contrasena = 8

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

    #validador string vacio
    _validar_campos_str = validador_no_string_vacio(
        'direccion_texto',
        'calle',
        'comuna',
        'region',
        'codigo_postal'
    )

class UsuarioCreate(BaseModel):
    nombres: str
    apellidos: str
    fecha_nacimiento: date
    correo: str
    telefono: int
    tipo_usuario: int
    contrasena: str
    direccion: DireccionCreate

    #validador string no vacio
    _validar_campos_str = validador_no_string_vacio('nombres', 'apellidos', 'correo', 'contrasena')

    #validador de formato contraseña
    _validar_contrasena = validador_contrasena(
        campo='contrasena',
        min_longitud=8,
        requerir_mayuscula=True,
        requerir_numero=True
    )

    #validador de formato correo
    _validar_formato_correo = validador_formato_correo('correo')

    #validador de formato telefono
    _validar_formato_telefono = validador_formato_telefono('telefono')
