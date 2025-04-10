from auth.util import create_access_token, verify_password
from repositories.user_repository import UsersRepository


class AuthService:

    def __init__(self):
        self.repository = UsersRepository()

    async def authenticate(self, data):
        user = await self.repository.get_user(data.email)
        if not user or not verify_password(data.password, user.password):
            return None
        token = create_access_token(data={"sub": user.email})
        return {"token": token, "email": user.email, "username": user.username}
