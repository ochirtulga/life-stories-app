from models.common.api_response import ApiResponse
from models.request.user import User
from repositories.user_repository import UsersRepository


class RegisterService:

    def __init__(self):
        self.repository = UsersRepository()

    async def register(self, user: User):
        get_response = await self.repository.get_user(user.email)
        if get_response is None:
            add_response = await self.repository.add_user(user)
            return add_response
        return None
