import json
from fastapi.testclient import TestClient


def test_root_endpoint(client):
    """
    Test the root endpoint returns the correct message
    """
    response = client.get("/api/")
    assert response.status_code == 200
    data = response.json()
    assert data == {"message": "Hello, World!"}


def test_get_greetings(client):
    """
    Test that the greetings endpoint returns the list of greetings
    """
    response = client.get("/api/greetings")
    assert response.status_code == 200
    data = response.json()
    assert "greetings" in data
    assert isinstance(data["greetings"], list)
    assert len(data["greetings"]) > 0