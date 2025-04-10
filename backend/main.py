from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.story_router import story_router
from auth.auth_router import auth_router
from routers.user_router import user_router
from auth.register_router import register_router

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(register_router, prefix="/api/v1/register", tags=["register"])
app.include_router(auth_router, prefix="/api/v1/login", tags=["login"])
app.include_router(user_router, prefix="/api/v1/users", tags=["users"])
app.include_router(story_router, prefix="/api/v1", tags=["stories"])
