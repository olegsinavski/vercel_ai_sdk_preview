import json
from typing import List
from pydantic import BaseModel
from fastapi import FastAPI, Query
from fastapi.responses import StreamingResponse
from .utils.prompt import ClientMessage


app = FastAPI()


class Request(BaseModel):
    messages: List[ClientMessage]


# Define the greetings list
greetings = [
    "Hello, World!",
    "Hola, Mundo!",
    "Bonjour, Monde!",
    "Ciao, Mondo!",
    "こんにちは, 世界!",
    "你好, 世界!",
    "Привет, Мир!"
]


def stream_hello_world(protocol: str = 'data'):
    # Send "Hello World" greeting in chunks to simulate streaming
    greeting = "Hello World! Welcome to the simplified application."
    
    # First chunk with "Hello World"
    yield '0:{text}\n'.format(text=json.dumps("Hello World! "))
    
    # Second chunk with additional text
    yield '0:{text}\n'.format(text=json.dumps("Welcome to the simplified application."))
    
    # End of stream with finish reason
    yield 'e:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0},"isContinued":false}\n'


@app.post("/api/chat")
async def handle_chat_data(request: Request, protocol: str = Query('data')):
    # Ignore the incoming message and just return Hello World
    response = StreamingResponse(stream_hello_world(protocol))
    response.headers['x-vercel-ai-data-stream'] = 'v1'
    return response


@app.get("/")
async def root():
    """Return a simple Hello World message"""
    return {"message": "Hello, World!"}


@app.get("/greetings")
async def get_greetings():
    """Return all available greetings"""
    return {"greetings": greetings}
