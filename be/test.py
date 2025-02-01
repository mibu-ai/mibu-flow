"""
mibu-flow: OpenAI-based file parser
- https://platform.openai.com/docs/assistants/tools/file-search
"""

import os
import logging

# import requests
from dotenv import load_dotenv
from openai import OpenAI

# Setup logger
logger = logging.getLogger("mibu_logger")
logger.setLevel(logging.DEBUG)

# Env
load_dotenv()
openapi_key = os.getenv("OPENAI_API_KEY")


# OpenAI
client = OpenAI(api_key=openapi_key)

assistant = client.beta.assistants.create(
    name="Financial Analyst Assistant",
    instructions="You are an expert financial analyst. Use you knowledge base to answer questions about audited financial statements.",
    model="gpt-4o",
    tools=[{"type": "file_search"}],
)

# Upload the user provided file to OpenAI
message_file = client.files.create(
    file=open("statement.pdf", "rb"), purpose="assistants"
)

# Create a thread and attach the file to the message
thread = client.beta.threads.create(
    messages=[
        {
            "role": "user",
            "content": "Output the itemized transactions in CSV format by reading the uploaded personal bank statement PDF. Output the results directly and do not provide any form of explanation or additional context.",
            # Attach the new file to the message.
            "attachments": [
                {
                    "file_id": message_file.id,
                    "tools": [{"type": "file_search"}],
                }
            ],
        }
    ]
)

# The thread now has a vector store with that file in its tool resources.
print(thread.tool_resources.file_search)


# Use the create and poll SDK helper to create a run and poll the status of
# the run until it's in a terminal state.
run = client.beta.threads.runs.create_and_poll(
    thread_id=thread.id, assistant_id=assistant.id
)

messages = list(client.beta.threads.messages.list(thread_id=thread.id, run_id=run.id))

message_content = messages[0].content[0].text
annotations = message_content.annotations
citations = []
for index, annotation in enumerate(annotations):
    message_content.value = message_content.value.replace(annotation.text, f"[{index}]")
    if file_citation := getattr(annotation, "file_citation", None):
        cited_file = client.files.retrieve(file_citation.file_id)
        citations.append(f"[{index}] {cited_file.filename}")

        print(message_content.value)
        print("\n".join(citations))

client.beta.threads.delete(thread_id=thread.id)

logger.info("Completed")
