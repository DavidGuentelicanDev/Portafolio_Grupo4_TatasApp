# Contiene los modelos ORM que definen las tablas de la base de datos.
# Creado por david el 15/04

from sqlalchemy import (
    Column,
    String,
    Text,
    BigInteger,
    Date,
    SmallInteger,
    ForeignKey,
    CheckConstraint,
    UniqueConstraint
)
from sqlalchemy.orm import relationship
from app.database import Base


#tabla direccion
#creada por david el 15/04
class Direccion(Base):
    __tablename__ = "DIRECCION"

    id = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
    direccion_texto = Column(Text, nullable=False)
    adicional = Column(String(100), nullable=True)

    #relacion inversa con usuario
    usuarios = relationship("Usuario", back_populates="direccion_rel")

#########################################################################################

#tabla usuario
#creada por david el 15/04
class Usuario(Base):
    __tablename__ = "USUARIO"

    #documentacion tipo_usuarios
    TIPOS_USUARIO = {
        1: "Adulto Mayor",
        2: "Familiar"
    }

    id = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
    nombres = Column(String(50), nullable=False)
    apellidos = Column(String(50), nullable=False)
    fecha_nacimiento = Column(Date, nullable=False)
    direccion_id = Column(BigInteger, ForeignKey("DIRECCION.id"), nullable=False, index=True)
    correo = Column(String(100), nullable=False, unique=True, index=True)
    telefono = Column(String(9), nullable=False, unique=True, index=True)

    #definicion especial para tipo_usuario con check
    tipo_usuario = Column(SmallInteger, nullable=False, index=True)
    __table_args__ = (
        CheckConstraint("tipo_usuario BETWEEN 1 AND 2", name="check_tipo_usuario_valido"),
    )

    contrasena = Column(String(255), nullable=False)
    foto_perfil = Column(Text, nullable=True)

    #relacion con tabla direccion
    direccion_rel = relationship("Direccion", back_populates="usuarios")

    #propiedad que permite leer el tipo de usuario segun el valor int guardado
    @property
    def tipo_usuario_nombre(self):
        return self.TIPOS_USUARIO.get(self.tipo_usuario, "Desconocido")

#########################################################################################

#tabla familiar
#creada por Andrea el 25/04
class Familiar(Base):
    __tablename__ = "FAMILIAR"

    id = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
    adulto_mayor_id = Column(BigInteger, ForeignKey("USUARIO.id"), nullable=False, index=True,)
    familiar_id = Column(BigInteger, ForeignKey("USUARIO.id"), nullable=False, index=True,)

    #relaciones
    adulto_mayor = relationship("Usuario", foreign_keys=[adulto_mayor_id], backref="familiares_a_cargo")
    familiar = relationship("Usuario", foreign_keys=[familiar_id], backref="adultos_mayores")

    #opcional: evitar duplicados con Constraint
    _table_args_ = (
        UniqueConstraint("adulto_mayor_id",  "familiar_id", name="uq_adulto_familiar"),
    )

    adulto_mayor= relationship("Usuario",foreign_keys=[adulto_mayor_id], backref="familiares_asociados")
    familiar= relationship("Usuario",foreign_keys=[familiar_id], backref="adultos_mayores_asociados")
