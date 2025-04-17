# Punto de entrada FastAPI
# Creado por david el 15/04

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError, HTTPException
from app.database import Base, engine
from app.routers import usuarios_router
import app.models


app = FastAPI() #inicializar la app

Base.metadata.create_all(bind=engine) #crea las tablas automaticamente al iniciar

#ruta raiz para verificar que la api funciona
@app.get("/")
def root():
    return {"mensaje": "API TatasApp iniciada correctamente"}


#incluye todas las rutas de manera modular de routers.py automaticamente
app.include_router(usuarios_router)


#handler para manejar errores de validacion (campos requeridos o tipo de dato incorrecto)
#agregado por david el 17/04
@app.exception_handler(RequestValidationError)
async def handler_validacion_excepciones_personalizadas(request: Request, exc: RequestValidationError):
    errores = []
    tipos_null_obligatorio = {"string_type", "int_type", "float_type", "date_type", "bool_type"}

    for error in exc.errors():
        loc = error.get("loc", [])
        tipo_error = error.get("type")
        mensaje = error.get("msg")

        if loc and loc[0] == 'body':
            loc = loc[1:]

        campo = ".".join(str(l) for l in loc) if loc else "campo_desconocido"

        #si el error esta dentro del arreglo
        if tipo_error in tipos_null_obligatorio:
            errores.append({
                "message": f"El campo '{campo}' es obligatorio y no puede ser nulo"
            })
        else:
            errores.append({
                "message": f"Error en el campo '{campo}': {mensaje}"
            })

    return JSONResponse(
        status_code=422,
        content={
            "status": "error",
            "message": "Error en la validación",
            "errors": errores
        }
    )


#handler para validacion de errores http (datos unicos)
#agregado por david el 17/04
@app.exception_handler(HTTPException)
async def handler_excepciones_http_peronalizadas(request: Request, exc: HTTPException):
    if isinstance(exc.detail, dict):
        return JSONResponse(
            status_code=exc.status_code,
            content=exc.detail
        )
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "status": "error",
            "message": exc.detail
        }
    )
