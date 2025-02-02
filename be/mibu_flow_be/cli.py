"""
mibu-flow: OpenAI-based file parser
- https://platform.openai.com/docs/assistants/tools/file-search
"""

import argparse
from mibu_flow_be.lib.openai_entities import client, add_to_thread
from mibu_flow_be.lib.logger import logger
from mibu_flow_be.utils.initialize import run_init

FILENAME = "statements/statement2.pdf"
THREAD_ID = "thread_088CzAkYwh5Ly6XGVsuaYafs"
# ASSISTANT_ID = "asst_A3cCpIgrypZGoSm5cSdEfEX7" # gpt-4-turbo
# ASSISTANT_ID = "asst_glVoUwCSqztIYofd7M2ABLXJ" # gpt-4o
ASSISTANT_ID = "asst_dvbIGLwtP08WRvSK43edEctl"  # gpt-4o-mini


def main():
    # Set up argument parser
    parser = argparse.ArgumentParser(description="Mibu Flow Backend CLI")
    parser.add_argument(
        "command", type=str, help="Command to run", nargs="?", default=None
    )
    args = parser.parse_args()

    if args.command == "init":
        run_init()
        return

    logger.debug(
        "Using resources:\n- assistant: %s\n- thread: %s\n- statement: %s",
        ASSISTANT_ID,
        THREAD_ID,
        FILENAME,
    )

    # Create file
    message_file = client.files.create(file=open(FILENAME, "rb"), purpose="assistants")

    # Create message
    message_id = add_to_thread(
        thread_id=THREAD_ID,
        message="Output the itemized transactions in CSV format by reading the uploaded personal bank statement PDF",
        message_file_id=message_file.id,
    )

    run_thread()

    # Delete file
    deleted_file = client.files.delete(message_file.id)
    logger.debug("Deleted file: %s", deleted_file.id)

    # Delete message
    deleted_message = client.beta.threads.messages.delete(
        message_id=message_id,
        thread_id=THREAD_ID,
    )
    logger.debug("Deleted message: %s", deleted_message.id)

    logger.info("Completed")


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


# The thread now has a vector store with that file in its tool resources.
# logger.debug(thread.tool_resources.file_search)


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


def run_thread():
    """
    Run the thread and poll the status of the run until it's in a terminal state.
    Do this after adding a message to the thread.
    """

    # Get thread by id
    thread = client.beta.threads.retrieve(THREAD_ID)

    # Use the create and poll SDK helper to create a run and poll the status of
    # the run until it's in a terminal state.
    run = client.beta.threads.runs.create_and_poll(
        thread_id=thread.id, assistant_id=ASSISTANT_ID
    )

    messages = list(
        client.beta.threads.messages.list(thread_id=thread.id, run_id=run.id)
    )

    message_content = messages[0].content[0].text
    annotations = message_content.annotations
    citations = []
    for index, annotation in enumerate(annotations):
        message_content.value = message_content.value.replace(
            annotation.text, f"[{index}]"
        )
        if file_citation := getattr(annotation, "file_citation", None):
            cited_file = client.files.retrieve(file_citation.file_id)
            citations.append(f"[{index}] {cited_file.filename}")

            logger.debug(message_content.value)
            logger.debug("\n".join(citations))
