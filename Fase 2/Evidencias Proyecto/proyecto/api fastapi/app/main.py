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
async def validacion_excepciones_personalizadas_handler(request: Request, exc: RequestValidationError):
    errores = []
    for error in exc.errors():
        field = ".".join(str(loc) for loc in error["loc"] if isinstance(loc, str))
        errores.append({
            "field": field,
            "message": error["msg"]
        })

    return JSONResponse(
        status_code=422,
        content={
            "status": "error",
            "message": "Error en la validacion de los campos enviados",
            "errors": errores
        }
    )


#handler para validacion de errores http (correo y telefono ya registrado)
#agregado por david el 17/04
@app.exception_handler(HTTPException)
async def http_exception_peronalizados_handler(request: Request, exc: HTTPException):
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
