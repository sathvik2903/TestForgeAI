from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = "mongodb+srv://sathvik:testforge123@cluster0.tabf34s.mongodb.net/?appName=Cluster0"

client = AsyncIOMotorClient(MONGO_URL)

db = client.testforge