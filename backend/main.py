from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import router
from ai_routes import router as ai_router

app = FastAPI()

# ================= CORS =================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= ROUTES =================

app.include_router(router)

app.include_router(ai_router)

# ================= HOME =================

@app.get("/")
async def home():

    return {
        "message": "TestForge AI Backend Running"
    }