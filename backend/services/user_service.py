from models.common.api_response import ApiResponse
from repositories.user_repository import UsersRepository


class UserService:

    def __init__(self):
        self.repository = UsersRepository()

    async def get_user(self, email):
        response = await self.repository.get_user(email)
        if response is None:
            return ApiResponse(status_code=400, message="User does not exist")
        return ApiResponse(status_code=200,
                           message="User found successfully",
                           data=response)
