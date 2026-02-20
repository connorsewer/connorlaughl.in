"""
LLM Handlers for TSI Marketing Machine Agents.

Provides handler functions that execute agent logic using the Claude API.
Each handler reads the agent's SKILL.md, builds context, and generates content.
"""

import os
import json
from pathlib import Path
from datetime import datetime
from typing import Dict, Any, Optional, Callable

import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from logger import get_logger
from api.anthropic import (
    ClaudeClient, get_claude_client,
    load_skill_prompt, build_agent_context, load_context_file
)

logger = get_logger("llm_handlers")

# Project paths
SCRIPT_DIR = Path(__file__).parent.parent
PROJECT_ROOT = SCRIPT_DIR.parent
DRAFTS_DIR = PROJECT_ROOT / "drafts"
INTEL_DIR = PROJECT_ROOT / "docs" / "intelligence"
FINAL_DIR = PROJECT_ROOT / "final_assets"


def create_llm_handler(agent_name: str, dry_run: bool = False) -> Callable:
    """
    Factory function to create an LLM handler for a given agent.

    Args:
        agent_name: Name of the agent (e.g., "Content-Production-ARM")
        dry_run: If True, simulate without making API calls

    Returns:
        Handler function that takes (inputs, context) and returns output dict
    """
    def handler(inputs: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        """Execute agent using Claude API."""
        client = get_claude_client(dry_run=dry_run)

        # Load the skill prompt
        skill_prompt = load_skill_prompt(agent_name)
        if not skill_prompt:
            return {
                "success": False,
                "error": f"Could not load skill prompt for {agent_name}"
            }

        # Get vertical from inputs or context
        vertical = inputs.get("vertical") or context.get("vertical", "General")

        # Build context based on vertical
        agent_context = build_agent_context(vertical)

        # Build user message with inputs
        user_message = f"""
## Task Context
- Vertical: {vertical}
- Date: {datetime.now().strftime('%Y-%m-%d')}
- Mode: {inputs.get('mode', 'standard')}

## Inputs
{json.dumps(inputs, indent=2)}

## Reference Context
{agent_context}

## Instructions
Execute your role as defined in your skill. Generate the required output.
"""

        try:
            result = client.generate(
                system_prompt=skill_prompt,
                user_message=user_message,
                temperature=0.7
            )

            return {
                "success": True,
                "content": result.get("content", ""),
                "usage": result.get("usage", {}),
                "agent": agent_name,
                "vertical": vertical
            }

        except Exception as e:
            logger.error(f"LLM handler failed for {agent_name}: {e}",
                        operation="llm_handler", agent=agent_name)
            return {
                "success": False,
                "error": str(e),
                "agent": agent_name
            }

    return handler


def market_scout_handler(inputs: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
    """
    Handler for Market-Scout agent.

    Scans for market intelligence and returns structured findings.
    """
    client = get_claude_client(dry_run=inputs.get("dry_run", False))
    vertical = inputs.get("vertical", "General")
    today = datetime.now().strftime("%Y-%m-%d")

    # Check for existing intel briefing
    intel_file = INTEL_DIR / f"intel_briefing_{today}_{vertical}.md"
    intel_content = ""
    if intel_file.exists():
        intel_content = intel_file.read_text()

    skill_prompt = load_skill_prompt("Market-Scout")
    if not skill_prompt:
        # Fallback prompt
        skill_prompt = """You are a Market Intelligence Scout for TSI.
Your role is to analyze market intelligence and identify key trends, regulatory changes,
and competitive movements relevant to the assigned vertical."""

    user_message = f"""
## Task: Market Intelligence Analysis for {vertical}

Today's Date: {today}

## Intel Briefing (if available):
{intel_content if intel_content else "No intel briefing found for today."}

## Instructions:
1. Analyze the available intelligence
2. Identify 2-3 key themes or opportunities
3. Recommend content angles that would resonate with {vertical} decision-makers
4. Flag any compliance-sensitive topics

Output your analysis in structured markdown format.
"""

    try:
        result = client.generate(
            system_prompt=skill_prompt,
            user_message=user_message,
            temperature=0.5
        )

        return {
            "success": True,
            "intel_analysis": result.get("content", ""),
            "vertical": vertical,
            "intel_date": today,
            "agent": "Market-Scout"
        }

    except Exception as e:
        logger.error(f"Market-Scout handler failed: {e}", operation="market_scout")
        return {"success": False, "error": str(e), "agent": "Market-Scout"}


def campaign_strategist_handler(inputs: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
    """
    Handler for Campaign-Strategist agent.

    Creates campaign strategy based on market intel and vertical ICP.
    """
    client = get_claude_client(dry_run=inputs.get("dry_run", False))
    vertical = inputs.get("vertical", "General")
    today = datetime.now().strftime("%Y-%m-%d")

    # Get intel analysis from previous step
    intel_analysis = context.get("intel_analysis", inputs.get("intel_analysis", ""))

    skill_prompt = load_skill_prompt("Campaign-Strategist")
    if not skill_prompt:
        skill_prompt = """You are a Campaign Strategist for TSI.
Your role is to create data-driven campaign strategies that align content
with business objectives and target audience needs."""

    # Build ICP context
    agent_context = build_agent_context(vertical)

    user_message = f"""
## Task: Create Campaign Strategy for {vertical}

Date: {today}

## Market Intelligence Analysis:
{intel_analysis if intel_analysis else "No intel analysis available."}

## Vertical Context:
{agent_context}

## Instructions:
Create a campaign strategy artifact that includes:
1. Campaign Theme (tied to current market conditions)
2. Target Persona (from ICP)
3. Key Messages (2-3 aligned with messaging architecture)
4. Recommended Asset Types (LinkedIn post, email sequence, etc.)
5. Proof Points to cite (reference PP-XXXX format)

Output as a structured Campaign Strategy Artifact in markdown.
"""

    try:
        result = client.generate(
            system_prompt=skill_prompt,
            user_message=user_message,
            temperature=0.6
        )

        return {
            "success": True,
            "strategy_artifact": result.get("content", ""),
            "vertical": vertical,
            "strategy_date": today,
            "agent": "Campaign-Strategist"
        }

    except Exception as e:
        logger.error(f"Campaign-Strategist handler failed: {e}", operation="campaign_strategist")
        return {"success": False, "error": str(e), "agent": "Campaign-Strategist"}


def campaign_manager_handler(inputs: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
    """
    Handler for Campaign-Manager agent.

    Orchestrates content production based on strategy, routes to appropriate producers.
    """
    client = get_claude_client(dry_run=inputs.get("dry_run", False))
    vertical = inputs.get("vertical", "General")
    mode = inputs.get("mode", "standard")
    today = datetime.now().strftime("%Y-%m-%d")

    # Get strategy from previous step
    strategy_artifact = context.get("strategy_artifact", inputs.get("strategy_artifact", ""))

    # Determine content production agent based on vertical
    content_agent_map = {
        "ARM": "Content-Production-ARM",
        "Healthcare": "Content-Production-Healthcare",
        "BPO": "Content-Production-BPO-CX",
        "DebtNext": "Content-Production-DebtNext",
        "LoanServicing": "Content-Production-LoanServicing"
    }
    content_agent = content_agent_map.get(vertical, "Content-Production-ARM")

    skill_prompt = load_skill_prompt("Campaign-Manager") or load_skill_prompt("campaign_management")
    if not skill_prompt:
        skill_prompt = """You are the Campaign Manager for TSI.
Your role is to orchestrate content production workflows, ensuring all content
aligns with strategy and passes compliance checks."""

    # Build context
    agent_context = build_agent_context(vertical)

    user_message = f"""
## Task: Produce Content for {vertical} Campaign

Date: {today}
Mode: {mode}
Content Agent: {content_agent}

## Campaign Strategy:
{strategy_artifact if strategy_artifact else "No strategy artifact provided - create one based on vertical context."}

## Vertical Context:
{agent_context}

## Instructions:
Based on the strategy (or create one if missing), produce:

1. **LinkedIn Post** (150-250 words)
   - Hook that addresses a pain point
   - Value proposition
   - Call to action
   - Relevant hashtags

2. **Email Subject Lines** (3 options)
   - Each under 50 characters
   - Focused on benefit/curiosity

3. **Brief for longer content** (if applicable)
   - Outline for a blog post or whitepaper section

## Compliance Reminders:
- Never use "Collections" alone (use "Recovery" or "ARM")
- No unsubstantiated superlatives
- Cite proof points with (Source: PP-XXXX) format
- Focus on protecting brand equity and higher net-back

Output all content in markdown format, clearly labeled by asset type.
"""

    try:
        result = client.generate(
            system_prompt=skill_prompt,
            user_message=user_message,
            max_tokens=4096,
            temperature=0.7
        )

        content = result.get("content", "")

        # Save the generated content to drafts
        output_file = DRAFTS_DIR / f"{today}_{vertical}_campaign_content.md"
        if not inputs.get("dry_run", False):
            DRAFTS_DIR.mkdir(parents=True, exist_ok=True)
            with open(output_file, 'w') as f:
                f.write(f"# Campaign Content: {vertical}\n")
                f.write(f"**Generated:** {datetime.now().isoformat()}\n")
                f.write(f"**Status:** Draft - Pending Compliance Review\n\n")
                f.write("---\n\n")
                f.write(content)
            logger.info(f"Saved campaign content to {output_file.name}",
                       operation="campaign_manager", vertical=vertical)

        return {
            "success": True,
            "content": content,
            "output_file": str(output_file),
            "vertical": vertical,
            "agent": "Campaign-Manager",
            "requires_compliance_review": True
        }

    except Exception as e:
        logger.error(f"Campaign-Manager handler failed: {e}", operation="campaign_manager")
        return {"success": False, "error": str(e), "agent": "Campaign-Manager"}


def content_production_handler(vertical: str, dry_run: bool = False):
    """
    Factory for Content-Production handlers.

    Creates a handler that generates complete, publication-ready content.
    """
    def handler(inputs: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        client = get_claude_client(dry_run=dry_run)
        today = datetime.now().strftime("%Y-%m-%d")

        # Get strategy and intel from previous steps
        strategy_artifact = context.get("strategy_artifact", "")
        intel_analysis = context.get("intel_analysis", "")

        # Load vertical-specific skill prompt
        skill_name = f"Content-Production-{vertical}"
        if vertical == "BPO":
            skill_name = "Content-Production-BPO-CX"

        skill_prompt = load_skill_prompt(skill_name)
        if not skill_prompt:
            skill_prompt = f"""You are the Senior Marketing Copywriter for TSI's {vertical} division.
Your role is to create high-quality, compliant B2B content that resonates with decision-makers.

CRITICAL RULES:
- NEVER use "Collections" alone - use "Recovery", "ARM", or "Accounts Receivable Management"
- NEVER use unsubstantiated superlatives like "best-in-class", "#1", or "industry-leading"
- ALWAYS cite proof points with (Source: PP-XXXX) format
- Focus on protecting brand equity and higher net-back"""

        # Build comprehensive context
        agent_context = build_agent_context(vertical, intel_analysis)

        user_message = f"""
## Your Assignment: Create Complete Marketing Content for {vertical}

**Date:** {today}
**Vertical:** {vertical}

## Campaign Strategy (from Campaign-Strategist):
{strategy_artifact if strategy_artifact else "Create timely, relevant content based on current market conditions and vertical pain points."}

## Market Intelligence (from Market-Scout):
{intel_analysis if intel_analysis else "Focus on evergreen value propositions for this vertical."}

## Reference Materials:
{agent_context}

---

## DELIVERABLES - Generate ALL of the following:

### 1. LinkedIn Thought Leadership Post
- **Length:** 200-300 words
- **Structure:**
  - Opening hook (question or bold statement addressing a pain point)
  - 3-4 bullet points with insights
  - Value proposition (what TSI offers)
  - Call to action
  - 5-7 relevant hashtags
- **Tone:** Authoritative but conversational, no jargon

### 2. Email Nurture Sequence (3 emails)
**Email 1 - Awareness:**
- Subject line (under 50 chars)
- Preview text (under 100 chars)
- Body (150-200 words) - Identify the problem

**Email 2 - Consideration:**
- Subject line
- Preview text
- Body (150-200 words) - Present the solution approach

**Email 3 - Decision:**
- Subject line
- Preview text
- Body (150-200 words) - Clear CTA and proof points

### 3. Short-Form Social Posts (3 variations)
- Twitter/X style (under 280 chars each)
- Can be excerpts from the LinkedIn post
- Include 2-3 hashtags each

### 4. Blog Post Outline
- Title (SEO-friendly, under 60 chars)
- Meta description (under 160 chars)
- H2 sections (4-5 sections)
- Key points for each section
- Suggested proof points to include

---

## COMPLIANCE CHECKLIST (Self-Review Before Submitting):
- [ ] No use of "Collections" as standalone noun
- [ ] No unsubstantiated superlatives
- [ ] Proof points cited where claims are made
- [ ] Focus on brand equity and net-back, not "getting money fast"
- [ ] Professional, relationship-focused tone

Generate all content now. Be specific and complete - this content should be ready for compliance review and then publication.
"""

        try:
            result = client.generate(
                system_prompt=skill_prompt,
                user_message=user_message,
                max_tokens=8000,
                temperature=0.7
            )

            content = result.get("content", "")

            # Save the generated content to drafts with YAML frontmatter
            output_file = DRAFTS_DIR / f"{today}_{vertical}_content_production.md"
            if not dry_run:
                DRAFTS_DIR.mkdir(parents=True, exist_ok=True)
                with open(output_file, 'w') as f:
                    # YAML frontmatter for dashboard parsing
                    f.write("---\n")
                    f.write(f"title: Content Production - {vertical}\n")
                    f.write(f"vertical: {vertical}\n")
                    f.write(f"content_type: ContentPackage\n")
                    f.write(f"status: DRAFT\n")
                    f.write(f"date: {today}\n")
                    f.write(f"agent: Content-Production-{vertical}\n")
                    f.write(f"generated: {datetime.now().isoformat()}\n")
                    f.write("---\n\n")
                    f.write(content)
                logger.info(f"Saved content to {output_file.name}",
                           operation="content_production", vertical=vertical)

            return {
                "success": True,
                "generated_content": content,
                "output_file": str(output_file),
                "vertical": vertical,
                "agent": f"Content-Production-{vertical}",
                "ready_for_compliance": True
            }

        except Exception as e:
            logger.error(f"Content-Production handler failed for {vertical}: {e}",
                        operation="content_production")
            return {"success": False, "error": str(e), "agent": f"Content-Production-{vertical}"}

    return handler


def compliance_check_handler(inputs: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
    """
    Handler for Compliance-Check agent.

    Reviews generated content for compliance violations and brand voice adherence.
    """
    dry_run = inputs.get("dry_run", False)
    client = get_claude_client(dry_run=dry_run)
    vertical = inputs.get("vertical", context.get("vertical", "General"))
    today = datetime.now().strftime("%Y-%m-%d")

    # Get content from previous step
    generated_content = context.get("generated_content", context.get("content", ""))
    output_file = context.get("output_file", "")

    if not generated_content:
        return {
            "success": False,
            "error": "No content provided for compliance review",
            "agent": "Compliance-Check"
        }

    skill_prompt = load_skill_prompt("Compliance-Check")
    if not skill_prompt:
        skill_prompt = """You are the Compliance Gatekeeper for TSI Marketing.
Your role is to review all marketing content for compliance violations, brand voice adherence,
and legal/regulatory risks before publication.

You must be thorough but fair - flag real issues, not stylistic preferences."""

    # Load compliance rules
    compliance_rules = load_context_file("docs/compliance/terminology_governance.md") or ""

    user_message = f"""
## Compliance Review Request

**Vertical:** {vertical}
**Date:** {today}
**Source File:** {output_file}

## Content to Review:
{generated_content}

## Compliance Rules Reference:
{compliance_rules}

---

## YOUR TASK: Perform a thorough compliance review

### Check for these CRITICAL violations:

1. **Forbidden Terms:**
   - "Collections" used as standalone noun (should be "Recovery", "ARM", etc.)
   - "Debtor" (should be "Consumer")
   - "Guaranteed" (legal risk)
   - Unsubstantiated superlatives: "best-in-class", "#1", "industry-leading"

2. **Missing Requirements:**
   - Claims without proof point citations (Source: PP-XXXX)
   - Missing CTAs in appropriate places

3. **Tone/Voice Issues:**
   - Aggressive or adversarial language
   - Focus on "collecting money" vs "protecting relationships"
   - Jargon that alienates the target audience

4. **Legal/Regulatory Risks:**
   - Promises that could be construed as guarantees
   - Misleading statistics or claims

---

## OUTPUT FORMAT:

### Compliance Review Summary

**Overall Status:** [APPROVED / APPROVED WITH CHANGES / REJECTED]

**Critical Issues:** (Must fix before publication)
- [List any critical violations]

**Recommended Changes:** (Should fix)
- [List any recommended improvements]

**Notes:** (Optional observations)
- [Any other feedback]

### Revised Content (if changes needed)
[Provide corrected versions of any flagged content]

---

Be specific about what needs to change and why. If content passes review, confirm approval clearly.
"""

    try:
        result = client.generate(
            system_prompt=skill_prompt,
            user_message=user_message,
            max_tokens=4000,
            temperature=0.3  # Lower temperature for more consistent review
        )

        review_content = result.get("content", "")

        # Determine approval status from response
        approved = "APPROVED" in review_content.upper() and "REJECTED" not in review_content.upper()

        # Save compliance review with YAML frontmatter
        review_file = DRAFTS_DIR / f"{today}_{vertical}_compliance_review.md"
        if not dry_run:
            DRAFTS_DIR.mkdir(parents=True, exist_ok=True)
            with open(review_file, 'w') as f:
                # YAML frontmatter for dashboard parsing
                f.write("---\n")
                f.write(f"title: Compliance Review - {vertical}\n")
                f.write(f"vertical: {vertical}\n")
                f.write(f"content_type: ComplianceReview\n")
                f.write(f"status: {'APPROVED' if approved else 'DRAFT'}\n")
                f.write(f"date: {today}\n")
                f.write(f"agent: Compliance-Check\n")
                f.write(f"source_file: {output_file}\n")
                f.write(f"reviewed: {datetime.now().isoformat()}\n")
                f.write("---\n\n")
                f.write(review_content)
            logger.info(f"Saved compliance review to {review_file.name}",
                       operation="compliance_check", vertical=vertical,
                       data={"approved": approved})

        return {
            "success": True,
            "compliance_review": review_content,
            "approved": approved,
            "review_file": str(review_file),
            "vertical": vertical,
            "agent": "Compliance-Check"
        }

    except Exception as e:
        logger.error(f"Compliance-Check handler failed: {e}", operation="compliance_check")
        return {"success": False, "error": str(e), "agent": "Compliance-Check"}


def register_all_handlers(runtime, dry_run: bool = False):
    """
    Register all LLM handlers with the agent runtime.

    Args:
        runtime: AgentRuntime instance
        dry_run: If True, handlers will simulate without API calls
    """
    logger.info("Registering LLM handlers", operation="register_handlers",
               data={"dry_run": dry_run})

    # Register specialized handlers
    runtime.register_handler("Market-Scout",
        lambda inputs, ctx: market_scout_handler({**inputs, "dry_run": dry_run}, ctx))

    runtime.register_handler("Campaign-Strategist",
        lambda inputs, ctx: campaign_strategist_handler({**inputs, "dry_run": dry_run}, ctx))

    runtime.register_handler("Campaign-Manager",
        lambda inputs, ctx: campaign_manager_handler({**inputs, "dry_run": dry_run}, ctx))

    # Register specialized content production handlers for each vertical
    content_verticals = {
        "Content-Production-ARM": "ARM",
        "Content-Production-Healthcare": "Healthcare",
        "Content-Production-BPO-CX": "BPO",
        "Content-Production-DebtNext": "DebtNext",
        "Content-Production-LoanServicing": "LoanServicing"
    }

    for agent_name, vertical in content_verticals.items():
        runtime.register_handler(agent_name, content_production_handler(vertical, dry_run=dry_run))

    # Register specialized Compliance-Check handler
    runtime.register_handler("Compliance-Check",
        lambda inputs, ctx: compliance_check_handler({**inputs, "dry_run": dry_run}, ctx))

    # Register generic handlers for other agents
    other_agents = [
        "Creative-Director",
        "Publisher",
        "Librarian"
    ]

    for agent_name in other_agents:
        runtime.register_handler(agent_name, create_llm_handler(agent_name, dry_run=dry_run))

    logger.info(f"Registered {len(content_verticals) + len(other_agents) + 4} handlers",
               operation="register_handlers")
