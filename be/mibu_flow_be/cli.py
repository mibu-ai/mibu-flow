"""
mibu-flow: OpenAI-based file parser
- https://platform.openai.com/docs/assistants/tools/file-search
"""

import argparse
from mibu_flow_be.lib.api import run_up
from mibu_flow_be.utils.initialize import run_init


def main():
    parser = argparse.ArgumentParser(description="Mibu Flow Backend CLI")
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    parser_init = subparsers.add_parser("init", help="Initialize assistant and thread")
    # parser_install.add_argument("model-name", help="Name of the model to use for the assistant")
    parser_init.set_defaults(func=run_init)

    # parser_up = subparsers.add_parser("up", help="Start the mibu-flow backend")
    # parser_install.add_argument("model-name", help="Name of the model to use for the assistant")
    # parser_up.set_defaults(func=run_up)

    args = parser.parse_args()

    # Call the function associated with the subcommand
    if hasattr(args, "func"):
        args.func(args)
    else:
        run_up()
        # parser.print_help()

    return  # return early

    # if args.command == "init":
    #     run_init()
    #     return


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
