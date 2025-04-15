# Define las rutas principales de la API y agrupa los endpoints por funcionalidades.
# Creado por david el 15/04

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.dependencies import get_db

router = APIRouter() #permite crear rutas en la api

#funcion de prueba
@router.get("/prueba")
def prueba(db: Session = Depends(get_db)):
    return {"mensaje": "Solo para probar si lo programado en dependencies.py funciono"}
