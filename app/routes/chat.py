from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from schemas.chat import ChatRequest
from db.database import SessionLocal
from db.models import Chat, Message
from services.groq_service import get_ai_response

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/chat")
def chat(req: ChatRequest, db: Session = Depends(get_db)):

    # get or create chat
    chat = db.query(Chat).filter(Chat.session_id == req.session_id).first()

    if not chat:
        chat = Chat(session_id=req.session_id)
        db.add(chat)
        db.commit()
        db.refresh(chat)

        system_msg = Message(
            chat_id=chat.id,
            role="system",
            content="You are a helpful assistant"
        )
        db.add(system_msg)
        db.commit()

    # save user message
    user_msg = Message(
        chat_id=chat.id,
        role="user",
        content=req.message
    )
    db.add(user_msg)
    db.commit()

    # get history
    messages = db.query(Message).filter(Message.chat_id == chat.id).all()

    formatted = [
        {"role": m.role, "content": m.content}
        for m in messages
    ]

    # limit memory
    formatted = formatted[-10:]

    # get AI reply
    reply = get_ai_response(formatted)

    # save assistant reply
    bot_msg = Message(
        chat_id=chat.id,
        role="assistant",
        content=reply
    )
    db.add(bot_msg)
    db.commit()

    return {"reply": reply}