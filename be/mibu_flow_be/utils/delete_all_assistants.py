import os
from dotenv import load_dotenv
from openai import OpenAI


# Env
load_dotenv()
openapi_key = os.getenv("OPENAI_API_KEY")

# OpenAI
client = OpenAI(api_key=openapi_key)

assistants = client.beta.assistants.list(
    order="desc",
    limit="50",
)

ids = [assistant.id for assistant in assistants.data]


# Delete all assistants
for assistantId in ids:
    client.beta.assistants.delete(assistant_id=id)
    print(f"Deleted assistant with id: {id}")
