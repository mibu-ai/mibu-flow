"""
Flask API server for Mibu Flow Backend
"""

import os
import uuid
from flask import Flask, request, jsonify
from mibu_flow_be.lib.openai_entities import parse_file
from mibu_flow_be.constants import UPLOAD_FOLDER, ALLOWED_EXTENSIONS

__all__ = ["run_up"]

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


@app.route("/")
def home():
    return "Welcome to Mibu Flow Backend"


@app.route("/api/v1/upload-file", methods=["POST"])
def upload_file():
    print("i ran")

    def allowed_file(filename):
        return (
            "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
        )

    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]

    if not file:
        return jsonify({"error": "No file part"}), 400
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file extension"}), 400

    filename = uuid.uuid4().hex + ".pdf"
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    # Parse the file
    result = parse_file(filepath)

    # Delete the tmp file
    os.remove(filepath)

    # Read file contents as example
    # content = buffered_reader.read().decode("utf-8")  # Decoding to string if text file

    return jsonify({"result": result})


def run_up():
    """
    Start the Mibu Flow Backend API
    """
    app.run(debug=True)
