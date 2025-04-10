
from fastapi import APIRouter

from services.user_service import UserService

user_router = APIRouter()


@user_router.get("/{email}")
async def search(email: str):
    service = UserService()
    return await service.get_user(email)
