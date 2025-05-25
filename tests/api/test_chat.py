from fastapi.testclient import TestClient
from api.utils.prompt import ClientMessage


def test_chat_endpoint(client):
    """
    Test the chat endpoint with a simple message
    """
    test_message = {
        "messages": [
            {
                "role": "user",
                "content": "Hello!"
            }
        ]
    }
    
    response = client.post(
        "/api/chat",
        json=test_message
    )
    
    # Check status code
    assert response.status_code == 200
    
    # Check that the response is a streaming response
    assert 'x-vercel-ai-data-stream' in response.headers
    assert response.headers['x-vercel-ai-data-stream'] == 'v1'
    
    # We can't easily test the streaming content in a unit test, but we can
    # verify the response is not empty
    content = response.content
    assert content