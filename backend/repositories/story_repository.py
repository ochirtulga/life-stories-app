import uuid
import boto3
from repositories.util import generate_datetime, generate_string_datetime
from models.response.story_response import Story
from boto3.dynamodb.conditions import Key

from logging import Logger

logger = Logger(__name__)


class StoryRepository:
    def __init__(self):
        self.dynamodb = boto3.resource("dynamodb")
        self.stories = self.dynamodb.Table("user_stories")
        self.stories_by_datetime = self.dynamodb.Table("stories_by_datetime")
        self.latest_datetime = self.dynamodb.Table("latest_datetime")

    def add_story(self, story):
        story_id = str(uuid.uuid1())
        current_datetime = generate_string_datetime()
        created_at = generate_datetime()
        self.stories.put_item(
            Item={
                'email': story.email,
                'story_id': story_id,
                'category': story.category,
                'title': story.title,
                'content': story.content,
                'created_at': created_at,
                'author': story.author
                })
        self.stories_by_datetime.put_item(
            Item={
                'datetime': current_datetime,
                'story_id': story_id,
                'email': story.email,
                'category': story.category,
                'title': story.title,
                'content': story.content,
                'created_at': created_at,
                'author': story.author
                })
        self.latest_datetime.put_item(
            Item={
                'key': '1',
                'datetime': current_datetime
                })
        return {"email": story.email, "story_id": story_id}

    def get_story_by_id(self, email, story_id):
        response = self.stories.get_item(
            Key={
                'email': email,
                'story_id': story_id
            }
        )
        logger.info(response)
        if response.get('Item') is None:
            return None
        return Story.model_validate(response.get('Item'))

    def get_stories_by_user(self, email):
        response = self.stories.get_item(
            Key={
                'email': email
            }
        )
        if response.get('Item') is None:
            return None
        return Story.model_validate(response.get('Item'))

    def get_stories(self):
        datetime_response = self.latest_datetime.get_item(
            Key={
                'key': '1'
            }
        )
        datetime = datetime_response.get('Item').get('datetime')
        response = self.stories_by_datetime.query(
            KeyConditionExpression=Key('datetime').eq(datetime)
        )
        return response.get('Items')
