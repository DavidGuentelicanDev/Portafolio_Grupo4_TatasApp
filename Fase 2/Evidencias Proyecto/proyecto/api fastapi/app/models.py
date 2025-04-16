# Contiene los modelos ORM que definen las tablas de la base de datos.
# Creado por david el 15/04

from sqlalchemy import Column, Integer, String, Text, BigInteger, Date, SmallInteger, ForeignKey, CheckConstraint, Float
from sqlalchemy.orm import relationship
from app.database import Base


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
    latitud = Column(Float, nullable=False)
    longitud = Column(Float, nullable=False)

    #relacion inversa con usuario
    usuarios = relationship("Usuario", back_populates="direccion_rel")

#########################################################################################

#tabla usuario
#creada por david el 15/04
class Usuario(Base):
    __tablename__ = "USUARIO"

    id = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
    nombres = Column(String(50), nullable=False)
    apellidos = Column(String(50), nullable=False)
    fecha_nacimiento = Column(Date, nullable=False)
    direccion_id = Column(BigInteger, ForeignKey("DIRECCION.id"), nullable=False, index=True)
    correo = Column(String(100), nullable=False, unique=True, index=True)
    telefono = Column(BigInteger, nullable=False, unique=True, index=True)

    #definicion especial para tipo_usuario con check
    tipo_usuario = Column(SmallInteger, nullable=False, index=True)
    __table_args__ = (
        CheckConstraint("tipo_usuario BETWEEN 1 AND 2", name="check_tipo_usuario_valido"),
    )

    contrasena = Column(String(255), nullable=False)
    foto_perfil = Column(Text, nullable=True)

    #relacion con tabla direccion
    direccion_rel = relationship("Direccion", back_populates="usuarios")
