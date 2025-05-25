import pytest
from api.utils.prompt import convert_to_openai_messages, ClientMessage, ToolInvocation, ToolInvocationState
from api.utils.attachment import ClientAttachment


def test_convert_to_openai_messages_basic():
    """
    Test the convert_to_openai_messages function with a simple message
    """
    test_messages = [
        ClientMessage(
            role="user",
            content="Hello, world!"
        )
    ]
    
    result = convert_to_openai_messages(test_messages)
    
    assert len(result) == 1
    assert result[0]["role"] == "user"
    assert len(result[0]["content"]) == 1
    assert result[0]["content"][0]["type"] == "text"
    assert result[0]["content"][0]["text"] == "Hello, world!"


def test_convert_to_openai_messages_with_attachments():
    """
    Test the convert_to_openai_messages function with a message containing attachments
    """
    test_messages = [
        ClientMessage(
            role="user",
            content="Check this image:",
            experimental_attachments=[
                ClientAttachment(
                    name="test.jpg",
                    contentType="image/jpeg",
                    url="test-url"
                )
            ]
        )
    ]
    
    result = convert_to_openai_messages(test_messages)
    
    assert len(result) == 1
    assert result[0]["role"] == "user"
    assert len(result[0]["content"]) == 2
    assert result[0]["content"][0]["type"] == "text"
    assert result[0]["content"][0]["text"] == "Check this image:"
    assert result[0]["content"][1]["type"] == "image_url"
    assert result[0]["content"][1]["image_url"]["url"] == "test-url"