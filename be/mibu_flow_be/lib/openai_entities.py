"""
OpenAI Client Instance
"""

import os
from dotenv import load_dotenv
from openai import OpenAI

__all__ = ["client"]

load_dotenv()
openapi_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=openapi_key)


def create_assistant() -> str:
    """
    Create an assistant with the name "Financial Analyst Assistant" and the model "gpt-4o".
    Do not run this function multiple times as it will create multiple assistants with the same name.

    Returns:
        str: The ID of the created assistant
    """

    assistant = client.beta.assistants.create(
        name="Financial Analyst Assistant",
        instructions="You are a personal bank statement PDF parser",
        model="gpt-4o-mini",
        # model="gpt-4-turbo",
        tools=[{"type": "file_search"}],
    )

    return assistant.id


def create_thread() -> str:
    """
    Create a thread with the message "Output the itemized transactions in CSV format by reading the uploaded personal bank statement PDF".

    Returns:
        str: The ID of the created thread
    """

    thread = client.beta.threads.create(
        messages=[
            {
                "role": "user",
                "content": "Output the itemized transactions in CSV format by reading the uploaded personal bank statement PDF",
                # "attachments": [
                #     {"file_id": message_file_id, "tools": [{"type": "file_search"}]}
                # ],
            }
        ]
    )

    return thread.id


def add_to_thread(message: str, thread_id: str, message_file_id: str) -> str:
    """
    Add a message to an existing thread.

    Args:
        message (str): The message to add
        thread_id (str): The ID of the thread
        message_file_id (str): The ID of the uploaded file to attach

    Returns:
        str: The ID of the created message
    """

    message = client.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=message,
        attachments=[{"file_id": message_file_id, "tools": [{"type": "file_search"}]}],
    )

    return message.id
