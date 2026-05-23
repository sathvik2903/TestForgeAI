from pydantic import BaseModel, EmailStr

# ================= USER =================

class User(BaseModel):
    email: EmailStr
    password: str

# ================= TEST CASE =================

class TestCase(BaseModel):
    title: str
    description: str
    priority: str
    status: str

# ================= BUG REPORT =================

class BugReport(BaseModel):
    title: str
    description: str
    severity: str
    status: str