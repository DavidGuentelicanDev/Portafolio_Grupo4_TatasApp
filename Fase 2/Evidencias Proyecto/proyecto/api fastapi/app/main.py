# Punto de entrada FastAPI
# Creado por david el 15/04

from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError, HTTPException
from app.database import Base, engine
from app.routers import usuarios_router
from app.validations import (
    handler_validacion_excepciones_personalizadas,
    handler_excepciones_http_peronalizadas
)
import app.models


app = FastAPI() #inicializar la app

Base.metadata.create_all(bind=engine) #crea las tablas automaticamente al iniciar

#ruta raiz para verificar que la api funciona
@app.get("/")
def root():
    return {"mensaje": "API TatasApp iniciada correctamente"}


#incluye todas las rutas de manera modular de routers.py automaticamente
app.include_router(usuarios_router)


#agregados los handlers
app.add_exception_handler(RequestValidationError, handler_validacion_excepciones_personalizadas)
app.add_exception_handler(HTTPException, handler_excepciones_http_peronalizadas)
