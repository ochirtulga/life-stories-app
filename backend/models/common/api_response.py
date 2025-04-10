from typing import Optional
from pydantic import BaseModel, Field


class ApiResponse(BaseModel):
    status_code: int
    message: str
    data: Optional[object] = Field(default=None)
