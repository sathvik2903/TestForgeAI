from fastapi import APIRouter, HTTPException
from database import db
from models import TestCase, BugReport, User
from bson import ObjectId

from auth import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter()

# ================= SERIALIZER =================

def serialize_doc(doc):
    doc["_id"] = str(doc["_id"])
    return doc

# ================= AUTH =================

@router.post("/signup")
async def signup(user: User):

    existing_user = await db.users.find_one({
        "email": user.email
    })

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    hashed_password = hash_password(
        user.password
    )

    user_data = {
        "email": user.email,
        "password": hashed_password
    }

    await db.users.insert_one(user_data)

    return {
        "message": "User created successfully"
    }

# ================= LOGIN =================

@router.post("/login")
async def login(user: User):

    db_user = await db.users.find_one({
        "email": user.email
    })

    if not db_user:
        raise HTTPException(
            status_code=400,
            detail="Invalid email"
        )

    valid_password = verify_password(
        user.password,
        db_user["password"]
    )

    if not valid_password:
        raise HTTPException(
            status_code=400,
            detail="Invalid password"
        )

    token = create_access_token({
        "sub": user.email
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }

# ================= TEST CASES =================

@router.post("/testcases")
async def create_testcase(testcase: TestCase):

    await db.testcases.insert_one(
        testcase.dict()
    )

    return {
        "message": "Test case created"
    }

@router.get("/testcases")
async def get_testcases():

    testcases = await db.testcases.find().to_list(100)

    return [
        serialize_doc(tc)
        for tc in testcases
    ]

@router.delete("/testcases/{id}")
async def delete_testcase(id: str):

    await db.testcases.delete_one({
        "_id": ObjectId(id)
    })

    return {
        "message": "Test case deleted"
    }

# ================= BUGS =================

@router.post("/bugs")
async def create_bug(bug: BugReport):

    await db.bugs.insert_one(
        bug.dict()
    )

    return {
        "message": "Bug created"
    }

@router.get("/bugs")
async def get_bugs():

    bugs = await db.bugs.find().to_list(100)

    return [
        serialize_doc(bug)
        for bug in bugs
    ]

@router.delete("/bugs/{id}")
async def delete_bug(id: str):

    await db.bugs.delete_one({
        "_id": ObjectId(id)
    })

    return {
        "message": "Bug deleted"
    }