from typing import Optional
from pydantic import BaseModel, Field


class User(BaseModel):
    email: str
    password: str
    username: Optional[str] = Field(default='Anonymous')
    bio: Optional[str] = Field(default='')
