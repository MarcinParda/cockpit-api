from sqlalchemy import Column, DateTime, func
from sqlalchemy.ext.declarative import declared_attr
from src.core.database import Base


class TimestampMixin:
    @declared_attr
    def created_at(cls):
        return Column(DateTime, default=func.now(), nullable=False)

    @declared_attr
    def updated_at(cls):
        return Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)


class BaseModel(Base, TimestampMixin):
    __abstract__ = True
