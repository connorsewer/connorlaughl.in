"""
TSI Marketing Machine - Error Handler

Enhanced error recovery with retry logic, dead letter queue, and escalation.
"""

import os
import json
import time
from pathlib import Path
from typing import Dict, List, Optional, Any, Callable
from datetime import datetime
from enum import Enum

import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from lib.logger import get_logger

logger = get_logger("error_handler")


class ErrorSeverity(Enum):
    """Error severity levels."""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class RetryConfig:
    """Configuration for retry logic."""
    
    def __init__(self, max_retries: int = 3, initial_delay: float = 1.0, 
                 max_delay: float = 60.0, exponential_base: float = 2.0):
        self.max_retries = max_retries
        self.initial_delay = initial_delay
        self.max_delay = max_delay
        self.exponential_base = exponential_base


class ErrorRecord:
    """Record of an error occurrence."""
    
    def __init__(self, error_type: str, message: str, context: Dict[str, Any],
                 severity: ErrorSeverity = ErrorSeverity.MEDIUM, 
                 retry_count: int = 0):
        self.error_type = error_type
        self.message = message
        self.context = context
        self.severity = severity
        self.retry_count = retry_count
        self.timestamp = datetime.utcnow().isoformat()
        self.resolved = False
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary for logging."""
        return {
            "error_type": self.error_type,
            "message": self.message,
            "context": self.context,
            "severity": self.severity.value,
            "retry_count": self.retry_count,
            "timestamp": self.timestamp,
            "resolved": self.resolved
        }


class ErrorHandler:
    """
    Enhanced error handler with retry logic and escalation.
    """
    
    def __init__(self, dlq_dir: Optional[Path] = None):
        """
        Initialize error handler.
        
        Args:
            dlq_dir: Directory for dead letter queue. If None, uses system_logs/dlq/
        """
        if dlq_dir is None:
            script_dir = Path(__file__).parent.parent.parent
            dlq_dir = script_dir / "system_logs" / "dlq"
        
        self.dlq_dir = Path(dlq_dir)
        self.dlq_dir.mkdir(parents=True, exist_ok=True)
        self._error_history: List[ErrorRecord] = []
    
    def retry_with_backoff(self, func: Callable, retry_config: Optional[RetryConfig] = None,
                          context: Optional[Dict[str, Any]] = None) -> Any:
        """
        Execute a function with exponential backoff retry logic.
        
        Args:
            func: Function to execute
            retry_config: Retry configuration. If None, uses defaults.
            context: Context for error logging
            
        Returns:
            Function result
            
        Raises:
            Exception: If all retries fail
        """
        config = retry_config or RetryConfig()
        context = context or {}
        
        last_exception = None
        
        for attempt in range(config.max_retries + 1):
            try:
                return func()
            except Exception as e:
                last_exception = e
                
                if attempt < config.max_retries:
                    # Calculate delay with exponential backoff
                    delay = min(
                        config.initial_delay * (config.exponential_base ** attempt),
                        config.max_delay
                    )
                    
                    logger.warning(f"Attempt {attempt + 1}/{config.max_retries + 1} failed. Retrying in {delay:.1f}s",
                                 operation="retry_with_backoff",
                                 data={"error": str(e), "attempt": attempt + 1, **context})
                    
                    time.sleep(delay)
                else:
                    # All retries exhausted
                    error_record = ErrorRecord(
                        error_type=type(e).__name__,
                        message=str(e),
                        context=context,
                        severity=ErrorSeverity.HIGH,
                        retry_count=attempt
                    )
                    self._error_history.append(error_record)
                    
                    logger.error(f"All retries exhausted after {config.max_retries + 1} attempts",
                               operation="retry_with_backoff",
                               data={"error": str(e), "attempts": attempt + 1, **context})
        
        raise last_exception
    
    def handle_error(self, error: Exception, context: Dict[str, Any],
                    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
                    escalate: bool = False) -> ErrorRecord:
        """
        Handle an error and optionally escalate.
        
        Args:
            error: The exception that occurred
            context: Additional context about the error
            severity: Error severity level
            escalate: Whether to escalate to System-Optimizer
            
        Returns:
            ErrorRecord for the error
        """
        error_record = ErrorRecord(
            error_type=type(error).__name__,
            message=str(error),
            context=context,
            severity=severity,
            retry_count=0
        )
        
        self._error_history.append(error_record)
        
        logger.error(f"Error handled: {error_record.error_type}",
                    operation="handle_error",
                    data={"severity": severity.value, **context})
        
        # Escalate if needed
        if escalate or severity == ErrorSeverity.CRITICAL:
            self._escalate(error_record)
        
        # Add to dead letter queue if critical
        if severity == ErrorSeverity.CRITICAL:
            self._add_to_dlq(error_record)
        
        return error_record
    
    def _escalate(self, error_record: ErrorRecord):
        """
        Escalate error to System-Optimizer.
        
        Args:
            error_record: The error record to escalate
        """
        escalation_file = self.dlq_dir / f"escalation_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.json"
        
        escalation_data = {
            "error": error_record.to_dict(),
            "escalated_at": datetime.utcnow().isoformat(),
            "action_required": "System-Optimizer should review and generate patch"
        }
        
        with open(escalation_file, 'w') as f:
            json.dump(escalation_data, f, indent=2)
        
        logger.warning(f"Error escalated to System-Optimizer: {escalation_file.name}",
                     operation="escalate",
                     data={"error_type": error_record.error_type})
    
    def _add_to_dlq(self, error_record: ErrorRecord):
        """
        Add error to dead letter queue.
        
        Args:
            error_record: The error record to add
        """
        dlq_file = self.dlq_dir / f"error_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.json"
        
        with open(dlq_file, 'w') as f:
            json.dump(error_record.to_dict(), f, indent=2)
        
        logger.info(f"Error added to DLQ: {dlq_file.name}",
                  operation="add_to_dlq",
                  data={"error_type": error_record.error_type})
    
    def get_error_history(self, error_type: Optional[str] = None,
                         severity: Optional[ErrorSeverity] = None,
                         limit: int = 100) -> List[ErrorRecord]:
        """
        Get error history.
        
        Args:
            error_type: Filter by error type
            severity: Filter by severity
            limit: Maximum number of results
            
        Returns:
            List of error records
        """
        history = self._error_history
        
        if error_type:
            history = [e for e in history if e.error_type == error_type]
        
        if severity:
            history = [e for e in history if e.severity == severity]
        
        return history[-limit:]
    
    def send_error_alert(self, error_record: ErrorRecord, recipient: Optional[str] = None):
        """
        Send email alert for critical errors.
        
        Args:
            error_record: The error record
            recipient: Email recipient. If None, uses default from config.
        """
        # This would integrate with email_health_report.py
        # For now, just log
        logger.warning(f"Error alert would be sent for: {error_record.error_type}",
                     operation="send_error_alert",
                     data={"severity": error_record.severity.value})


# Global error handler instance
_error_handler: Optional[ErrorHandler] = None


def get_error_handler() -> ErrorHandler:
    """Get or create the global error handler."""
    global _error_handler
    if _error_handler is None:
        _error_handler = ErrorHandler()
    return _error_handler
