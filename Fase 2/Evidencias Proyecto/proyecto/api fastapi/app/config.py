# Variables de entorno, claves, settings
# Creado por david el 15/04

from dotenv import load_dotenv
import os

load_dotenv() #carga las variables desde el archivo .env

class Settings:
    PROJECT_NAME: str = "TatasApp API"
    API_V1_STR: str = "/api/v1"

    DB_HOST = os.getenv("DB_HOST")
    DB_PORT = os.getenv("DB_PORT")
    DB_NAME = os.getenv("DB_NAME")
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")

    ALLOWED_ORIGINS: list[str] = os.getenv("ALLOWED_ORIGINS", "*").split(",")

    @property
    def database_url(self):
        return f"postgresql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

settings = Settings()
