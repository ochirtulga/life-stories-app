from pydantic import BaseModel, Field
from typing import Optional


class StoryRequest(BaseModel):
    email: Optional[str] = Field(default='anonymous@email.com')
    category: str
    title: Optional[str] = Field(default='Untitled')
    content: str
    author: Optional[str] = Field(default='Anonymous')
