from fastapi import APIRouter
from pydantic import BaseModel
from fastapi.responses import FileResponse

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import getSampleStyleSheet

from reportlab.lib.pagesizes import letter
from database import db

import cohere

router = APIRouter()

# ================= COHERE =================

co = cohere.ClientV2(
    "aO28RpD2lrgCB6DLYIXYWuNXetIishEvcKRsXzB5"
)

# ================= MODEL =================

class PromptRequest(BaseModel):
    prompt: str

# ================= GENERATE AI TESTCASES =================

@router.post("/generate-testcases")
async def generate_testcases(data: PromptRequest):

    response = co.chat(

        model="command-a-03-2025",

        messages=[
            {
                "role": "user",
                "content": f"""
Generate professional software testing test cases for:
{data.prompt}

Include:
- positive test cases
- negative test cases
- edge cases
- security scenarios

Format clearly.
"""
            }
        ]
    )

    generated_text = response.message.content[0].text

    # ================= SAVE TO DATABASE =================

    await db.ai_testcases.insert_one({

        "prompt": data.prompt,

        "response": generated_text

    })

    return {

        "response": generated_text
    }

# ================= AI HISTORY =================

@router.get("/ai-history")
async def get_ai_history():

    history = []

    async for item in db.ai_testcases.find():

        item["_id"] = str(item["_id"])

        history.append(item)

    return history
@router.get("/download-ai-report")
async def download_ai_report():

    filename = "ai_testcases_report.pdf"

    doc = SimpleDocTemplate(
        filename,
        pagesize=letter
    )

    styles = getSampleStyleSheet()

    elements = []

    elements.append(
        Paragraph(
            "AI Generated Test Cases Report",
            styles['Title']
        )
    )

    elements.append(Spacer(1, 20))

    async for item in db.ai_testcases.find():

        elements.append(
            Paragraph(
                f"<b>Prompt:</b> {item['prompt']}",
                styles['Heading2']
            )
        )

        elements.append(
            Spacer(1, 10)
        )

        formatted_text = item['response'].replace(
            "\n",
            "<br/>"
        )

        elements.append(
            Paragraph(
                formatted_text,
                styles['BodyText']
            )
        )

        elements.append(
            Spacer(1, 25)
        )

    doc.build(elements)

    return FileResponse(
        filename,
        media_type='application/pdf',
        filename=filename
    )