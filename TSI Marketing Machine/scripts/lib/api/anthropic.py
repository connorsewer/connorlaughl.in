"""
Claude/Anthropic API Client for TSI Marketing Machine.

Provides:
- Claude API integration for agent-based content generation
- Prompt building from SKILL.md files
- Context injection for vertical-specific content
"""

import os
import json
import time
import urllib.request
import urllib.error
from pathlib import Path
from typing import Dict, Any, Optional, List

import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from logger import get_logger

logger = get_logger("anthropic")

# Project paths
SCRIPT_DIR = Path(__file__).parent.parent.parent
PROJECT_ROOT = SCRIPT_DIR.parent
SKILLS_DIR = PROJECT_ROOT / ".agent" / "skills"
DOCS_DIR = PROJECT_ROOT / "docs"


class AnthropicAPIError(Exception):
    """Custom exception for Anthropic API errors."""

    def __init__(self, message: str, status_code: int = None, response: str = None):
        self.message = message
        self.status_code = status_code
        self.response = response
        super().__init__(self.message)


class ClaudeClient:
    """
    Client for Claude/Anthropic API.

    Used to execute agent prompts and generate content.
    """

    BASE_URL = "https://api.anthropic.com/v1"
    DEFAULT_MODEL = "claude-sonnet-4-20250514"
    MAX_TOKENS = 4096
    MAX_RETRIES = 3
    RETRY_DELAY = 1.0

    def __init__(self, api_key: Optional[str] = None, dry_run: bool = False):
        """
        Initialize Claude client.

        Args:
            api_key: Anthropic API key. If None, reads from ANTHROPIC_API_KEY env var.
            dry_run: If True, simulate API calls without making requests.
        """
        self.api_key = api_key or os.environ.get("ANTHROPIC_API_KEY")
        self.dry_run = dry_run
        self._last_request_time = 0

        if not self.api_key and not dry_run:
            logger.warning("ANTHROPIC_API_KEY not set - API calls will fail")

    def _get_headers(self) -> Dict[str, str]:
        """Return authentication headers."""
        return {
            "x-api-key": self.api_key or "",
            "anthropic-version": "2023-06-01",
            "Content-Type": "application/json"
        }

    def _rate_limit(self):
        """Ensure minimum delay between requests."""
        elapsed = time.time() - self._last_request_time
        if elapsed < 0.5:
            time.sleep(0.5 - elapsed)
        self._last_request_time = time.time()

    def generate(
        self,
        system_prompt: str,
        user_message: str,
        model: Optional[str] = None,
        max_tokens: Optional[int] = None,
        temperature: float = 0.7
    ) -> Dict[str, Any]:
        """
        Generate content using Claude API.

        Args:
            system_prompt: System prompt (agent instructions)
            user_message: User message (task/context)
            model: Model to use (defaults to DEFAULT_MODEL)
            max_tokens: Max tokens for response
            temperature: Sampling temperature

        Returns:
            Dict with 'content' (generated text) and 'usage' (token counts)
        """
        if self.dry_run:
            logger.info("[DRY-RUN] Would call Claude API", operation="generate",
                       data={"system_len": len(system_prompt), "user_len": len(user_message)})
            return {
                "content": f"[DRY-RUN] Content would be generated here based on:\n- System prompt: {len(system_prompt)} chars\n- User message: {len(user_message)} chars",
                "usage": {"input_tokens": 0, "output_tokens": 0},
                "dry_run": True
            }

        if not self.api_key:
            raise AnthropicAPIError("ANTHROPIC_API_KEY not configured")

        payload = {
            "model": model or self.DEFAULT_MODEL,
            "max_tokens": max_tokens or self.MAX_TOKENS,
            "temperature": temperature,
            "system": system_prompt,
            "messages": [
                {"role": "user", "content": user_message}
            ]
        }

        self._rate_limit()

        for attempt in range(self.MAX_RETRIES):
            try:
                request = urllib.request.Request(
                    f"{self.BASE_URL}/messages",
                    data=json.dumps(payload).encode('utf-8'),
                    headers=self._get_headers(),
                    method="POST"
                )

                start_time = time.time()
                with urllib.request.urlopen(request, timeout=120) as response:
                    duration = (time.time() - start_time) * 1000
                    response_body = response.read().decode('utf-8')
                    result = json.loads(response_body)

                    # Extract content from response
                    content = ""
                    if result.get("content"):
                        for block in result["content"]:
                            if block.get("type") == "text":
                                content += block.get("text", "")

                    logger.info("Claude API call completed",
                               operation="generate",
                               data={"model": payload["model"]},
                               duration_ms=round(duration, 2))

                    return {
                        "content": content,
                        "usage": result.get("usage", {}),
                        "model": result.get("model"),
                        "stop_reason": result.get("stop_reason")
                    }

            except urllib.error.HTTPError as e:
                error_body = e.read().decode('utf-8') if e.fp else ""
                logger.warning(f"Claude API error: {e.code}",
                             operation="generate",
                             data={"status": e.code, "attempt": attempt + 1})

                # Don't retry on client errors except rate limits
                if 400 <= e.code < 500 and e.code != 429:
                    raise AnthropicAPIError(f"API error: {e.code}", status_code=e.code, response=error_body)

                if attempt < self.MAX_RETRIES - 1:
                    delay = self.RETRY_DELAY * (2 ** attempt)
                    if e.code == 429:
                        delay = max(delay, 10.0)
                    time.sleep(delay)
                else:
                    raise AnthropicAPIError(f"Request failed after {self.MAX_RETRIES} attempts",
                                          status_code=e.code, response=error_body)

            except urllib.error.URLError as e:
                logger.warning(f"Network error: {e.reason}",
                             operation="generate",
                             data={"attempt": attempt + 1})
                if attempt < self.MAX_RETRIES - 1:
                    time.sleep(self.RETRY_DELAY * (2 ** attempt))
                else:
                    raise AnthropicAPIError(f"Network error: {e.reason}")

        raise AnthropicAPIError("Request failed after all retries")

    def test_connection(self) -> bool:
        """Test API connection by making a minimal request."""
        if self.dry_run:
            return True
        if not self.api_key:
            return False
        try:
            result = self.generate(
                system_prompt="You are a helpful assistant.",
                user_message="Say 'ok' and nothing else.",
                max_tokens=10
            )
            return bool(result.get("content"))
        except Exception as e:
            logger.error(f"Connection test failed: {e}", operation="test_connection")
            return False


def load_skill_prompt(skill_name: str) -> Optional[str]:
    """
    Load a skill's system prompt from its SKILL.md file.

    Args:
        skill_name: Name of the skill (e.g., "Content-Production-ARM")

    Returns:
        The skill content as a string, or None if not found.
    """
    # Convert skill name to directory name format
    # e.g., "Content-Production-ARM" -> "content_production_arm"
    dir_name = skill_name.lower().replace("-", "_")
    skill_path = SKILLS_DIR / dir_name / "SKILL.md"

    if not skill_path.exists():
        # Try variations
        for subdir in SKILLS_DIR.iterdir():
            if subdir.is_dir():
                skill_file = subdir / "SKILL.md"
                if skill_file.exists():
                    # Check if name matches in frontmatter
                    content = skill_file.read_text()
                    if f"name: {skill_name}" in content:
                        return content

        logger.warning(f"Skill file not found for: {skill_name}", operation="load_skill")
        return None

    return skill_path.read_text()


def load_context_file(relative_path: str) -> Optional[str]:
    """
    Load a context file from the docs directory.

    Args:
        relative_path: Path relative to project root (e.g., "docs/positioning/icp_arm.md")

    Returns:
        File contents or None if not found.
    """
    full_path = PROJECT_ROOT / relative_path
    if not full_path.exists():
        logger.warning(f"Context file not found: {relative_path}", operation="load_context")
        return None
    return full_path.read_text()


def build_agent_context(vertical: str, intel_briefing: Optional[str] = None) -> str:
    """
    Build context string for an agent based on vertical.

    Args:
        vertical: Vertical name (ARM, Healthcare, BPO, DebtNext)
        intel_briefing: Optional market intelligence content

    Returns:
        Formatted context string
    """
    context_parts = []

    # Load vertical-specific ICP
    icp_map = {
        "ARM": "docs/positioning/icp_arm.md",
        "Healthcare": "docs/positioning/icp_healthcare_rcm.md",
        "BPO": "docs/positioning/icp_bpo_cx.md",
        "DebtNext": "docs/positioning/icp_debtnext_rrm.md",
        "LoanServicing": "docs/positioning/icp_loanservicing.md"
    }

    if vertical in icp_map:
        icp_content = load_context_file(icp_map[vertical])
        if icp_content:
            context_parts.append(f"## ICP for {vertical}\n{icp_content}")

    # Load common files
    common_files = [
        ("docs/positioning/messaging_architecture.md", "Messaging Architecture"),
        ("docs/foundation/brand_voice_style_terminology.md", "Brand Voice"),
        ("docs/compliance/terminology_governance.md", "Compliance Rules")
    ]

    for file_path, label in common_files:
        content = load_context_file(file_path)
        if content:
            context_parts.append(f"## {label}\n{content}")

    # Add intel briefing if provided
    if intel_briefing:
        context_parts.append(f"## Today's Market Intelligence\n{intel_briefing}")

    return "\n\n---\n\n".join(context_parts)


# Global client instances (separate for live vs dry-run)
_live_client: Optional[ClaudeClient] = None
_dry_client: Optional[ClaudeClient] = None


def get_claude_client(dry_run: bool = False) -> ClaudeClient:
    """Get or create Claude client based on dry_run mode."""
    global _live_client, _dry_client
    if dry_run:
        if _dry_client is None:
            _dry_client = ClaudeClient(dry_run=True)
        return _dry_client
    else:
        if _live_client is None:
            _live_client = ClaudeClient(dry_run=False)
        return _live_client
