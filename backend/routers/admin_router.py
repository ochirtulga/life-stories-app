from fastapi import APIRouter
admin = APIRouter(prefix="/admin", tags=["Story"])


@admin.get("/")
def get_admin():
    return {"message": "Hello World"}
