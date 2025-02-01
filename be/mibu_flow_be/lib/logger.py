"""
Logger configuration
"""

import logging

# Explicit exports
__all__ = ["logger"]

# Create a logger
logger = logging.getLogger(__name__)

# Set the logging level for the logger
logger.setLevel(logging.DEBUG)

# Create a console handler
console_handler = logging.StreamHandler()

# Create a formatter and attach it to the handler
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
console_handler.setFormatter(formatter)

# Add the handler to the logger
logger.addHandler(console_handler)
