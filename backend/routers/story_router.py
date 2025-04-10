from fastapi import APIRouter
from models.common.api_response import ApiResponse
from services.story_service import StoryService
from models.request.story_request import StoryRequest

story_router = APIRouter()


@story_router.post("/story")
def submit_story(story: StoryRequest):
    service = StoryService()
    response = service.submit_story(story)
    if response:
        return ApiResponse(
            status_code=200,
            message="Story submitted successfully",
            data=response
        )
    return ApiResponse(
        status_code=400,
        message="Failed to submit story",
        data=None
    )


@story_router.get("/story")
def get_story(email, story_id):
    service = StoryService()
    response = service.get_story(email, story_id)
    if response:
        return ApiResponse(
            status_code=200,
            message="Stories retrieved successfully",
            data=response
        )
    return ApiResponse(
        status_code=400,
        message="Failed to retrieve stories",
        data=None
    )


@story_router.get("/stories")
def get_stories():
    service = StoryService()
    response = service.get_stories()
    if response:
        return ApiResponse(
            status_code=200,
            message="Stories retrieved successfully",
            data=response
        )
    return ApiResponse(
        status_code=400,
        message="Failed to retrieve stories",
        data=None
    )

