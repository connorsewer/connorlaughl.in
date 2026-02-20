"""
Base API Client for TSI Marketing Machine integrations.

Provides:
- Common HTTP methods with retry logic
- Rate limiting
- Error handling
- Logging integration
"""

import os
import json
import time
import urllib.request
import urllib.error
import urllib.parse
from typing import Dict, Any, Optional, Tuple
from abc import ABC, abstractmethod

import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from logger import get_logger


class APIError(Exception):
    """Custom exception for API errors."""

    def __init__(self, message: str, status_code: int = None, response: str = None):
        self.message = message
        self.status_code = status_code
        self.response = response
        super().__init__(self.message)


class APIClient(ABC):
    """
    Base class for API integrations.

    Subclasses must implement:
    - _get_auth_headers(): Return authentication headers
    - SERVICE_NAME: Class attribute for logging
    """

    SERVICE_NAME = "api"
    BASE_URL = ""
    MAX_RETRIES = 3
    RETRY_DELAY = 1.0  # seconds
    RATE_LIMIT_DELAY = 0.5  # seconds between requests

    def __init__(self, dry_run: bool = False):
        self.dry_run = dry_run
        self.logger = get_logger(self.SERVICE_NAME)
        self._last_request_time = 0

    @abstractmethod
    def _get_auth_headers(self) -> Dict[str, str]:
        """Return authentication headers for API requests."""
        pass

    def _rate_limit(self):
        """Ensure minimum delay between requests."""
        elapsed = time.time() - self._last_request_time
        if elapsed < self.RATE_LIMIT_DELAY:
            time.sleep(self.RATE_LIMIT_DELAY - elapsed)
        self._last_request_time = time.time()

    def _make_request(
        self,
        method: str,
        endpoint: str,
        data: Optional[Dict] = None,
        headers: Optional[Dict] = None,
        timeout: int = 30
    ) -> Tuple[int, Dict]:
        """
        Make an HTTP request with retry logic.

        Args:
            method: HTTP method (GET, POST, PUT, DELETE)
            endpoint: API endpoint (appended to BASE_URL)
            data: Request body (will be JSON encoded)
            headers: Additional headers
            timeout: Request timeout in seconds

        Returns:
            Tuple of (status_code, response_dict)

        Raises:
            APIError: On request failure after retries
        """
        url = f"{self.BASE_URL}{endpoint}"
        request_headers = self._get_auth_headers()
        request_headers["Content-Type"] = "application/json"
        if headers:
            request_headers.update(headers)

        body = json.dumps(data).encode('utf-8') if data else None

        if self.dry_run:
            self.logger.info(f"[DRY-RUN] Would {method} to {endpoint}",
                           operation="api_request",
                           data={"method": method, "endpoint": endpoint, "body_preview": str(data)[:200] if data else None})
            return (200, {"dry_run": True, "message": "Request simulated"})

        self._rate_limit()

        for attempt in range(self.MAX_RETRIES):
            try:
                request = urllib.request.Request(
                    url,
                    data=body,
                    headers=request_headers,
                    method=method
                )

                start_time = time.time()
                with urllib.request.urlopen(request, timeout=timeout) as response:
                    duration = (time.time() - start_time) * 1000
                    response_body = response.read().decode('utf-8')
                    status_code = response.getcode()

                    self.logger.info(f"{method} {endpoint} completed",
                                   operation="api_request",
                                   data={"status": status_code},
                                   duration_ms=round(duration, 2))

                    try:
                        return (status_code, json.loads(response_body) if response_body else {})
                    except json.JSONDecodeError:
                        return (status_code, {"raw": response_body})

            except urllib.error.HTTPError as e:
                error_body = e.read().decode('utf-8') if e.fp else ""
                self.logger.warning(f"{method} {endpoint} failed: {e.code}",
                                  operation="api_request",
                                  data={"status": e.code, "attempt": attempt + 1, "error": error_body[:200]})

                # Don't retry on client errors (4xx) except 429 (rate limit)
                if 400 <= e.code < 500 and e.code != 429:
                    raise APIError(f"Client error: {e.code}", status_code=e.code, response=error_body)

                if attempt < self.MAX_RETRIES - 1:
                    delay = self.RETRY_DELAY * (2 ** attempt)  # Exponential backoff
                    if e.code == 429:
                        delay = max(delay, 5.0)  # Longer delay for rate limits
                    time.sleep(delay)
                else:
                    raise APIError(f"Request failed after {self.MAX_RETRIES} attempts",
                                 status_code=e.code, response=error_body)

            except urllib.error.URLError as e:
                self.logger.warning(f"{method} {endpoint} network error: {e.reason}",
                                  operation="api_request",
                                  data={"attempt": attempt + 1})
                if attempt < self.MAX_RETRIES - 1:
                    time.sleep(self.RETRY_DELAY * (2 ** attempt))
                else:
                    raise APIError(f"Network error: {e.reason}")

        raise APIError("Request failed after all retries")

    def get(self, endpoint: str, **kwargs) -> Tuple[int, Dict]:
        """Make a GET request."""
        return self._make_request("GET", endpoint, **kwargs)

    def post(self, endpoint: str, data: Dict, **kwargs) -> Tuple[int, Dict]:
        """Make a POST request."""
        return self._make_request("POST", endpoint, data=data, **kwargs)

    def put(self, endpoint: str, data: Dict, **kwargs) -> Tuple[int, Dict]:
        """Make a PUT request."""
        return self._make_request("PUT", endpoint, data=data, **kwargs)

    def delete(self, endpoint: str, **kwargs) -> Tuple[int, Dict]:
        """Make a DELETE request."""
        return self._make_request("DELETE", endpoint, **kwargs)

    @abstractmethod
    def test_connection(self) -> bool:
        """Test API connection. Returns True if successful."""
        pass
