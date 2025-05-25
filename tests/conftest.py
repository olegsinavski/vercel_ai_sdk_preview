import pytest
from fastapi.testclient import TestClient
from api.index import app


@pytest.fixture
def client():
    """
    Create a TestClient for the FastAPI app
    """
    return TestClient(app)