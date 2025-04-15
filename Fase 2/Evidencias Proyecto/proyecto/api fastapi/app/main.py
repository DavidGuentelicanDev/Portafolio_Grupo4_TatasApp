# Punto de entrada FastAPI
# Creado por david el 15/04

from fastapi import FastAPI
from app.database import Base, engine
from app.routers import router as api_router

#inicializar la app
app = FastAPI()

#crea las tablas automaticamente al iniciar
Base.metadata.create_all(bind=engine)

#ruta raiz para verificar que la api funciona
@app.get("/")
def root():
    return {"mensaje": "API TatasApp iniciada correctamente"}

#incluye todas las rutas de routers.py automaticamente
app.include_router(api_router)
