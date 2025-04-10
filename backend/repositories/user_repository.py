import boto3
from models.request.user import User


class UsersRepository:
    def __init__(self):
        self.dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
        self.users = self.dynamodb.Table('story_users')

    async def add_user(self, user: User):
        response = self.users.put_item(
            Item={
                'email': user.email,
                'password': user.password,
                'username': user.username
                })
        return response

    async def get_user(self, email):
        response = self.users.get_item(
            Key={
                'email': email
            }
        )
        if response.get('Item') is None:
            return None
        return User.model_validate(response.get('Item'))
