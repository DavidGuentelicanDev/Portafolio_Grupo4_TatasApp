# Contiene los modelos ORM que definen las tablas de la base de datos.
# Creado por david el 15/04

from sqlalchemy import Column, Integer, String, Text, Numeric, BigInteger, Date, SmallInteger, ForeignKey, Enum
from sqlalchemy.sql.sqltypes import DECIMAL
from sqlalchemy.orm import relationship
from app.database import Base
import enum


#tabla direccion
#creada por david el 15/04
class Direccion(Base):
    __tablename__ = "DIRECCION"

    id = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
    direccion_texto = Column(Text, nullable=False)
    calle = Column(String(50), nullable=False)
    numero = Column(Integer, nullable=False)
    adicional = Column(String(100), nullable=True)
    comuna = Column(String(50), nullable=False)
    region = Column(String(50), nullable=False)
    codigo_postal = Column(String(20), nullable=False)
    latitud = Column(DECIMAL(10,8), nullable=False)
    longitud = Column(DECIMAL(11,8), nullable=False)

    #relacion inversa con usuario
    #usuarios = relationship("Usuario", back_populates="dir_relacion")

#########################################################################################

#tabla usuario
#creada por david el 15/04
# class Usuario(Base):
#     __tablename__ = "USUARIO"

#     id = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
#     nombres = Column(String(50), nullable=False)
#     apellidos = Column(String(50), nullable=False)
#     fecha_nacimiento = Column(Date, nullable=False)
#     direccion_id = Column(BigInteger, ForeignKey("DIRECCION.id"), nullable=False, index=True)
#     correo = Column(String(100), nullable=False, unique=True)
#     telefono = Column(BigInteger, nullable=False, unique=True)
#     tipo_usuario = Column(SmallInteger, nullable=False)
#     contrasena = Column(String(255), nullable=False)
#     foto_perfil = Column(Text, nullable=True)

#     #relacion con tabla direccion
#     dir_relacion = relationship("Direccion", back_populates="usuarios")
