from repositories.story_repository import StoryRepository


class StoryService:

    def __init__(self):
        self.story_repository = StoryRepository()

    def submit_story(self, story):
        return self.story_repository.add_story(story)

    def get_stories(self):
        return self.story_repository.get_stories()

    def get_story(self, email, story_id):
        return self.story_repository.get_story_by_id(email, story_id)
