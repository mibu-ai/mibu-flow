"""
mibu-flow: OpenAI-based file parser
- https://platform.openai.com/docs/assistants/tools/file-search
"""

import os
import logging
import sys

from dotenv import load_dotenv
from openai import OpenAI

# Setup logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)  # Set the logging level
stdout_handler = logging.StreamHandler(sys.stdout)
stdout_handler.setLevel(logging.DEBUG)  # Set the handler level
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
stdout_handler.setFormatter(formatter)
logger.addHandler(stdout_handler)

# Env
load_dotenv()
openapi_key = os.getenv("OPENAI_API_KEY")


# OpenAI
client = OpenAI(api_key=openapi_key)

assistant = client.beta.assistants.create(
    name="Financial Analyst Assistant",
    instructions="You are provided with a personal bank statement PDF.",
    model="gpt-4o",
    tools=[{"type": "file_search"}],
)

# Upload the user provided file to OpenAI
message_file = client.files.create(
    file=open("statement.pdf", "rb"), purpose="assistants"
)


# Create a vector store caled "Financial Statements"
# vector_store = client.beta.vector_stores.create(
#     name="Financial Statements", expires_after={"anchor": "last_active_at", "days": 1}
# )

# Ready the files for upload to OpenAI
# file_paths = ["statement.pdf"]
# file_streams = [open(path, "rb") for path in file_paths]

# Use the upload and poll SDK helper to upload the files, add them to the vector store,
# and poll the status of the file batch for completion.
# file_batch = client.beta.vector_stores.file_batches.upload_and_poll(
#     vector_store_id=vector_store.id, files=file_streams
# )

# You can logger.debug the status and the file counts of the batch to see the result of this operation.
# logger.debug(file_batch.status)
# logger.debug(file_batch.file_counts)

# Update the assistant to use the vector store
# assistant = client.beta.assistants.update(
#     assistant_id=assistant.id,
#     tool_resources={"file_search": {"vector_store_ids": [vector_store.id]}},
# )


# Create a thread and attach the file to the message
thread = client.beta.threads.create(
    messages=[
        {
            "role": "user",
            "content": "Output the itemized transactions in CSV format by reading the uploaded personal bank statement PDF",
        }
    ]
)

# The thread now has a vector store with that file in its tool resources.
logger.debug(thread.tool_resources.file_search)


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

        logger.debug(message_content.value)
        logger.debug("\n".join(citations))

client.beta.threads.delete(thread_id=thread.id)

logger.info("Completed")


"""
# Regex pattern to match content between triple backticks
pattern = r'```(.*?)```'

# Use re.DOTALL to allow the dot (.) to match newline characters
matches = re.findall(pattern, input_string, re.DOTALL)

# Output the extracted content
if matches:
        print(matches[0].strip())  # Use strip() to remove leading/trailing whitespace
        else:
            print("No match found.")
"""
