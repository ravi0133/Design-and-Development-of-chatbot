from fastapi import APIRouter, Request
from app.models.schemas import ChatRequest, ChatResponse

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def chat(request: Request, chat_request: ChatRequest):
    rag = request.app.state.rag_pipeline

    result = await rag.query(
        question=chat_request.message,
        country=chat_request.country
    )

    return ChatResponse(
        response=result["response"],
        sources=result.get("sources", [])
    )
