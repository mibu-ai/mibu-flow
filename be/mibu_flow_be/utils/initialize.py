import json
from mibu_flow_be.lib.openai_entities import create_assistant, create_thread

DATA_DIR = "data"

__all__ = ["run_init"]


def run_init():
    """
    Initialize the assistant and thread.
    Warning Note: If an assistant or thread already exists, this function will naively create a duplicates.
    """

    with open(f"{DATA_DIR}/entities.json", encoding="utf-8") as f:
        data = json.load(f)

    if "assistant_id" not in data:
        assistant_id = create_assistant()
        data["assistant_id"] = assistant_id

    if "thread_id" not in data:
        thread_id = create_thread(data["message_file_id"])
        data["thread_id"] = thread_id

    with open(f"{DATA_DIR}/entities.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
