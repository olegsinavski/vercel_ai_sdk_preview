from fastapi import FastAPI


app = FastAPI()


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


@app.get("/api/")
async def root():
    """Return a simple Hello World message"""
    return {"message": "Hello, World!"}


@app.get("/api/greetings")
async def get_greetings():
    """Return all available greetings"""
    return {"greetings": greetings}
