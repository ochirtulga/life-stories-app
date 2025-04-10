from services.register_service import RegisterService
from models.common.api_response import ApiResponse
from models.request.user import User
from auth.util import get_password_hash, create_access_token

from fastapi import APIRouter

register_router = APIRouter()


@register_router.post("")
async def register(new_user: User) -> ApiResponse:
    new_user.password = get_password_hash(new_user.password)
    service = RegisterService()
    response = await service.register(new_user)
    if response is None:
        return ApiResponse(status_code=400, message="User already exists")
    token = create_access_token(data={"sub": new_user.email})
    return ApiResponse(status_code=200,
                       message="User created successfully",
                       data={"token": token,
                             "email": new_user.email,
                             "username": new_user.username})
