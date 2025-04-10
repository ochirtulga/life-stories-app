from fastapi import APIRouter

from models.common.api_response import ApiResponse
from models.request.login_request import LoginRequest
from services.auth_service import AuthService

auth_router = APIRouter()


@auth_router.post("")
async def login(data: LoginRequest):
    service = AuthService()
    response = await service.authenticate(data)
    if response is None:
        return ApiResponse(status_code=400,
                           detail="Incorrect email or password")
    return ApiResponse(status_code=200,
                       message="Login successful",
                       data=response)
