from typing import Optional
from pydantic import BaseModel


class Story(BaseModel):
    email: str
    story_id: str
    category: str
    title: Optional[str]
    content: str
    author: Optional[str]
    created_at: Optional[str]
