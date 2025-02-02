"""
Flask API server for Mibu Flow Backend
"""

import os
import uuid
from flask import Flask, request, jsonify
from flask_cors import CORS
import threading
from mibu_flow_be.lib.openai_entities import parse_file_to_cache
from mibu_flow_be.constants import UPLOAD_FOLDER, ALLOWED_EXTENSIONS

__all__ = ["run_up"]

app = Flask(__name__)
CORS(app)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

results_cache = {}


@app.route("/sanity-check", methods=["GET"])
def sanity_check():
    return jsonify({"results_cache": results_cache})


@app.route("/api/v1/job-status/<job_id>", methods=["GET"])
def get_job_status(job_id):
    # TODO: Issue here: if results_cache grows and grows (we do not trim it), could be a memory leak

    if job_id not in results_cache:
        return jsonify({"status": "indeterminate", "msg": "Job not found"}), 404

    return jsonify(results_cache[job_id])


@app.route("/api/v1/upload-file", methods=["POST"])
def upload_file():
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

    job_id = uuid.uuid4().hex
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], job_id + ".pdf")
    file.save(filepath)

    # Parse the file
    thread = threading.Thread(
        target=lambda: (
            parse_file_to_cache(filepath, job_id, results_cache),
            os.remove(filepath),
        )
    )
    thread.start()

    # Read file contents as example
    # content = buffered_reader.read().decode("utf-8")  # Decoding to string if text file

    return jsonify({"job_id": job_id})


def run_up():
    """
    Start the Mibu Flow Backend API
    """
    app.run(debug=True)
