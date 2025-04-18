# Funciones generales de utilidad: validaciones, generadores de códigos, formateo de datos, etc.
# Validar formato de email
# Convertir datos entre formatos (ej: dict a JSON con reglas especiales)
# Generar códigos únicos

# Creado por david el 15/04

from pydantic import field_validator
from typing import Any
from typing_extensions import Literal


#CONSTANTES
MIN_CONTRASENA = 8 #agregado por david el 17/04

#VALIDADORES GENERICOS

#valida que un string no este vacio o solo con espacios
#creado por david el 17/04
def no_string_vacio(v: str, field_name: str = 'campo') -> str:
    if not v or not v.strip():
        raise ValueError(f"El campo '{field_name}' no puede estar vacío")
    return v.strip()

#valida la fortaleza de la contraseña
#creado por david el 17/04
def fortalecer_contrasena(
    contrasena: str, 
    min_longitud: int = MIN_CONTRASENA,
    requerir_mayuscula: bool = True,
    requerir_numero: bool = True
) -> str:
    if len(contrasena) < min_longitud:
        raise ValueError(f"La contraseña debe tener al menos {min_longitud} caracteres")
    if requerir_mayuscula and not any(c.isupper() for c in contrasena):
        raise ValueError("La contraseña debe contener al menos una mayúscula")
    if requerir_numero and not any(c.isdigit() for c in contrasena):
        raise ValueError("La contraseña debe contener al menos un número")
    return contrasena

#VERSION DECORADORES

#decorador no_string_vacio
#creado por david el 17/04
def validador_no_string_vacio(*campos: str):
    return field_validator(*campos)(lambda cls, v, info: no_string_vacio(v, info.field_name))

#decorador fortalecer_contrasena
def validador_contrasena(
    campo: str = 'contrasena',
    min_longitud: int = MIN_CONTRASENA,
    requerir_mayuscula: bool = True,
    requerir_numero: bool = True
):
    return field_validator(campo)(
        lambda cls, v, info: fortalecer_contrasena(
            v,
            min_longitud=min_longitud,
            requerir_mayuscula=requerir_mayuscula,
            requerir_numero=requerir_numero
        )
    )
