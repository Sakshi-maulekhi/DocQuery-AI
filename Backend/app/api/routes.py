import os
import shutil

from fastapi import APIRouter, UploadFile, File, HTTPException

from app.schemas import ChatRequest
from app.services.indexing_service import index_pdf
from app.services.rag_service import chat

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.get("/health")
def health():
    return {
        "status": "OK"
    }


@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):

    try:
        if file.content_type != "application/pdf":
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed."
            )

        file_path = os.path.join(UPLOAD_DIR, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        index_pdf(file_path)

        return {
            "message": "PDF uploaded and indexed successfully."
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.post("/chat")
def ask_question(request: ChatRequest):

    answer = chat(request.question)

    return {
        "answer": answer
    }