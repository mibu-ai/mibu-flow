"""
OpenAI Client Instance
"""

import os
import re
from dotenv import load_dotenv
from openai import OpenAI
from mibu_flow_be.lib.logger import logger
from mibu_flow_be.constants import ASSISTANT_ID, THREAD_ID

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


def run_thread(thread_id: str, assistant_id: str) -> str:
    """
    Run the thread and poll the status of the run until it's in a terminal state.
    Do this after adding a message to the thread.

    Return:
        str: The result of the thread
    """
    logger.info("Running thread %s with assistant %s", thread_id, assistant_id)

    # Get thread by id
    thread = client.beta.threads.retrieve(thread_id)

    # Use the create and poll SDK helper to create a run and poll the status of
    # the run until it's in a terminal state.
    run = client.beta.threads.runs.create_and_poll(
        thread_id=thread.id, assistant_id=assistant_id
    )

    messages = list(
        client.beta.threads.messages.list(thread_id=thread.id, run_id=run.id)
    )

    message_content = messages[0].content[0].text
    annotations = message_content.annotations
    citations = []
    result = ""
    for index, annotation in enumerate(annotations):
        message_content.value = message_content.value.replace(
            annotation.text, f"[{index}]"
        )
        if file_citation := getattr(annotation, "file_citation", None):
            cited_file = client.files.retrieve(file_citation.file_id)
            citations.append(f"[{index}] {cited_file.filename}")

            result += message_content.value
            result += "\n".join(citations)

    logger.debug("Thread completed")

    return result


def parse_file_to_cache(file_path: str, job_id: str, results_cache: dict) -> str:
    results_cache[job_id] = {"status": "running"}

    logger.debug(
        "Using resources:\n- assistant: %s\n- thread: %s\n- file_path: %s",
        ASSISTANT_ID,
        THREAD_ID,
        file_path,
    )

    # Create file
    message_file = client.files.create(file=open(file_path, "rb"), purpose="assistants")

    # Create message
    message_id = add_to_thread(
        thread_id=THREAD_ID,
        message="Output the itemized transactions in CSV format by reading the uploaded personal bank statement PDF",
        message_file_id=message_file.id,
    )

    try:
        result = run_thread(THREAD_ID, ASSISTANT_ID)
    except Exception as e:
        logger.error("Error running thread: %s", e)
        results_cache[job_id] = {"status": "error", "payload": str(e)}
        return str(e)

    # Delete file
    deleted_file = client.files.delete(message_file.id)
    logger.debug("Deleted file: %s", deleted_file.id)

    # Delete message
    deleted_message = client.beta.threads.messages.delete(
        message_id=message_id,
        thread_id=THREAD_ID,
    )
    logger.debug("Deleted message: %s", deleted_message.id)

    # Use regex to extract only the CSV part
    pattern = r"```csv(.*?)```"
    matches = re.findall(
        pattern, result, re.DOTALL
    )  # Use re.DOTALL to allow the dot (.) to match newline characters
    if matches:
        result = matches[0].strip()  # Use strip() to remove leading/trailing whitespace

    # Store in results_cache
    results_cache[job_id] = {"status": "completed", "payload": result}
