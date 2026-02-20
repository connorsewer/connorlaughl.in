"""
TSI Marketing Machine - Structured Logging

Provides consistent logging across all scripts with:
- JSON-formatted logs for machine parsing
- Human-readable console output
- Log levels (DEBUG, INFO, WARNING, ERROR, CRITICAL)
- Contextual fields (agent, vertical, operation)
"""

import logging
import json
import sys
import os
from datetime import datetime
from typing import Optional, Dict, Any

# Determine paths
SCRIPT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
LOG_DIR = os.path.join(PROJECT_ROOT, "system_logs")


class JSONFormatter(logging.Formatter):
    """Formats log records as JSON for machine parsing."""

    def format(self, record: logging.LogRecord) -> str:
        log_data = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
        }

        # Add extra fields if present
        if hasattr(record, "agent"):
            log_data["agent"] = record.agent
        if hasattr(record, "vertical"):
            log_data["vertical"] = record.vertical
        if hasattr(record, "operation"):
            log_data["operation"] = record.operation
        if hasattr(record, "duration_ms"):
            log_data["duration_ms"] = record.duration_ms
        if hasattr(record, "extra_data"):
            log_data["data"] = record.extra_data

        # Add exception info if present
        if record.exc_info:
            log_data["exception"] = self.formatException(record.exc_info)

        return json.dumps(log_data)


class ConsoleFormatter(logging.Formatter):
    """Human-readable console output with colors."""

    COLORS = {
        "DEBUG": "\033[36m",     # Cyan
        "INFO": "\033[32m",      # Green
        "WARNING": "\033[33m",   # Yellow
        "ERROR": "\033[31m",     # Red
        "CRITICAL": "\033[35m",  # Magenta
    }
    RESET = "\033[0m"

    def format(self, record: logging.LogRecord) -> str:
        color = self.COLORS.get(record.levelname, self.RESET)
        timestamp = datetime.now().strftime("%H:%M:%S")

        # Build prefix with context
        prefix_parts = [f"[{timestamp}]"]
        if hasattr(record, "agent"):
            prefix_parts.append(f"[{record.agent}]")
        if hasattr(record, "vertical"):
            prefix_parts.append(f"[{record.vertical}]")

        prefix = " ".join(prefix_parts)
        level = f"{color}{record.levelname:8}{self.RESET}"

        return f"{prefix} {level} {record.getMessage()}"


class TSILogger:
    """
    Main logger class for TSI Marketing Machine.

    Usage:
        from lib.logger import get_logger
        logger = get_logger("autopilot")
        logger.info("Starting run", agent="Chief-of-Staff")
        logger.error("Failed to fetch RSS", vertical="ARM", operation="fetch_news")
    """

    def __init__(self, name: str, log_to_file: bool = True, log_level: str = "INFO"):
        self.logger = logging.getLogger(f"tsi.{name}")
        self.logger.setLevel(getattr(logging, log_level.upper()))
        self.logger.handlers = []  # Clear existing handlers

        # Console handler (human-readable)
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setFormatter(ConsoleFormatter())
        self.logger.addHandler(console_handler)

        # File handler (JSON format)
        if log_to_file:
            os.makedirs(LOG_DIR, exist_ok=True)
            log_file = os.path.join(LOG_DIR, f"{name}.jsonl")
            file_handler = logging.FileHandler(log_file)
            file_handler.setFormatter(JSONFormatter())
            self.logger.addHandler(file_handler)

    def _log(
        self,
        level: int,
        message: str,
        agent: Optional[str] = None,
        vertical: Optional[str] = None,
        operation: Optional[str] = None,
        duration_ms: Optional[float] = None,
        data: Optional[Dict[str, Any]] = None,
        exc_info: bool = False,
    ):
        """Internal log method with extra fields."""
        extra = {}
        if agent:
            extra["agent"] = agent
        if vertical:
            extra["vertical"] = vertical
        if operation:
            extra["operation"] = operation
        if duration_ms is not None:
            extra["duration_ms"] = duration_ms
        if data:
            extra["extra_data"] = data

        self.logger.log(level, message, extra=extra, exc_info=exc_info)

    def debug(self, message: str, **kwargs):
        self._log(logging.DEBUG, message, **kwargs)

    def info(self, message: str, **kwargs):
        self._log(logging.INFO, message, **kwargs)

    def warning(self, message: str, **kwargs):
        self._log(logging.WARNING, message, **kwargs)

    def error(self, message: str, **kwargs):
        self._log(logging.ERROR, message, **kwargs)

    def critical(self, message: str, **kwargs):
        self._log(logging.CRITICAL, message, **kwargs)

    def exception(self, message: str, **kwargs):
        """Log an error with exception traceback."""
        self._log(logging.ERROR, message, exc_info=True, **kwargs)


# Module-level logger cache
_loggers: Dict[str, TSILogger] = {}


def get_logger(name: str, **kwargs) -> TSILogger:
    """
    Get or create a logger instance.

    Args:
        name: Logger name (e.g., "autopilot", "optimization", "health")
        **kwargs: Passed to TSILogger constructor

    Returns:
        TSILogger instance
    """
    if name not in _loggers:
        _loggers[name] = TSILogger(name, **kwargs)
    return _loggers[name]


# Convenience function for quick logging
def log_operation(
    logger_name: str,
    operation: str,
    success: bool,
    message: str = "",
    **kwargs
):
    """
    Quick logging for operation results.

    Usage:
        log_operation("autopilot", "fetch_rss", True, "Fetched 3 items", vertical="ARM")
    """
    logger = get_logger(logger_name)
    level = "info" if success else "error"
    status = "completed" if success else "failed"
    full_message = f"{operation} {status}" + (f": {message}" if message else "")
    getattr(logger, level)(full_message, operation=operation, **kwargs)
