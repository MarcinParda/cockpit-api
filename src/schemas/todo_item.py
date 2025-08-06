from typing import Optional
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field, field_serializer
from src.schemas.todo_project import TodoProject


class TodoItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    shops: Optional[str] = None
    project_id: int  # Now required


class TodoItemCreate(TodoItemBase):
    pass


class TodoItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    is_closed: Optional[bool] = None
    shops: Optional[str] = None
    completed_at: Optional[datetime] = None
    project_id: Optional[int] = None


# Use a reduced TodoProject schema to avoid circular dependencies
class SimpleTodoProject(BaseModel):
    id: int
    name: str
    created_at: datetime
    updated_at: datetime
    owner_id: str  # Change type to str to handle UUID conversion
    is_general: bool = False

    model_config = ConfigDict(from_attributes=True)

    @field_serializer('owner_id')
    def serialize_owner_id(self, owner_id):
        return str(owner_id) if owner_id else None


class TodoItemInDBBase(TodoItemBase):
    id: int
    is_closed: bool
    created_at: datetime
    updated_at: datetime
    completed_at: Optional[datetime] = None
    # Use the simplified project schema
    project: Optional[SimpleTodoProject] = None

    model_config = ConfigDict(from_attributes=True)


class TodoItem(TodoItemInDBBase):
    pass
