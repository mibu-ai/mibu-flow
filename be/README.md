## Backend

### Step 1: Install in editable mode

```sh
pip install -e .
```

### Step 2: Run the server

```sh
mibu-flow-be
```

If you have "special" needs (i.e. Windows users) and the above command does not work, you can try the following:

```sh
python -m mibu_flow_be
```

or

```sh
python .\mibu_flow_be\lib\api.py
```

---

### Danger Zone

Do **not** run this command unless you know what you are doing:

```sh
mibu-flow-be init
```

This command creates new assistants and threads, and overwrites the `output.txt` file with the IDs of these new entities.

OpenAI does not currently provide a way to list all threads, so if you lose the IDs of your threads, you will not be able to access/delete them.