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
