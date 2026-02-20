"""
TSI Marketing Machine - Agent Registry

Discovers and registers all agent skill definitions from .agent/skills/
Provides agent lookup, dependency resolution, and metadata access.
"""

import os
import re
from pathlib import Path
from typing import Dict, List, Optional, Any
from dataclasses import dataclass

import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from lib.logger import get_logger

logger = get_logger("agent_registry")


@dataclass
class AgentSkill:
    """Represents a parsed agent skill definition."""
    name: str
    description: str
    skill_path: Path
    frontmatter: Dict[str, Any]
    content: str
    dependencies: List[str]
    inputs: List[str]
    outputs: List[str]


class AgentRegistry:
    """
    Registry for all agent skills in the system.
    
    Discovers agents from .agent/skills/ and provides lookup capabilities.
    """
    
    def __init__(self, skills_dir: Optional[Path] = None):
        """
        Initialize the agent registry.
        
        Args:
            skills_dir: Path to .agent/skills/ directory. If None, auto-detects from project root.
        """
        if skills_dir is None:
            # Auto-detect project root
            script_dir = Path(__file__).parent.parent.parent
            skills_dir = script_dir / ".agent" / "skills"
        
        self.skills_dir = Path(skills_dir)
        self._agents: Dict[str, AgentSkill] = {}
        self._load_agents()
    
    def _load_agents(self):
        """Load all agent skills from the skills directory."""
        if not self.skills_dir.exists():
            logger.warning(f"Skills directory not found: {self.skills_dir}", operation="load_agents")
            return
        
        agent_dirs = [d for d in self.skills_dir.iterdir() if d.is_dir()]
        logger.info(f"Discovering agents from {self.skills_dir}", 
                   operation="load_agents",
                   data={"agent_dirs": len(agent_dirs)})
        
        for agent_dir in agent_dirs:
            skill_file = agent_dir / "SKILL.md"
            if not skill_file.exists():
                logger.warning(f"SKILL.md not found in {agent_dir.name}", operation="load_agents")
                continue
            
            try:
                agent = self._parse_skill_file(skill_file)
                if agent:
                    self._agents[agent.name] = agent
                    logger.debug(f"Registered agent: {agent.name}", operation="load_agents")
            except Exception as e:
                logger.error(f"Failed to parse {skill_file}: {e}", operation="load_agents")
    
    def _parse_skill_file(self, skill_path: Path) -> Optional[AgentSkill]:
        """
        Parse a SKILL.md file and extract agent metadata.
        
        Args:
            skill_path: Path to SKILL.md file
            
        Returns:
            AgentSkill object or None if parsing fails
        """
        with open(skill_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Parse frontmatter
        if not content.startswith("---"):
            logger.warning(f"Missing frontmatter in {skill_path.name}", operation="parse_skill")
            return None
        
        parts = content.split("---", 2)
        if len(parts) < 3:
            logger.warning(f"Malformed frontmatter in {skill_path.name}", operation="parse_skill")
            return None
        
        try:
            # Simple YAML-like parsing (key: value format)
            frontmatter = {}
            for line in parts[1].strip().split('\n'):
                line = line.strip()
                if ':' in line and not line.startswith('#'):
                    key, value = line.split(':', 1)
                    frontmatter[key.strip()] = value.strip().strip('"').strip("'")
        except Exception as e:
            logger.error(f"Failed to parse frontmatter in {skill_path.name}: {e}", operation="parse_skill")
            return None
        
        if not frontmatter or 'name' not in frontmatter:
            logger.warning(f"Missing 'name' in frontmatter: {skill_path.name}", operation="parse_skill")
            return None
        
        # Extract dependencies, inputs, outputs from content
        dependencies = self._extract_dependencies(parts[2])
        inputs = self._extract_section(parts[2], "Inputs")
        outputs = self._extract_section(parts[2], "Output")
        
        return AgentSkill(
            name=frontmatter.get('name', ''),
            description=frontmatter.get('description', ''),
            skill_path=skill_path,
            frontmatter=frontmatter,
            content=parts[2],
            dependencies=dependencies,
            inputs=inputs,
            outputs=outputs
        )
    
    def _extract_dependencies(self, content: str) -> List[str]:
        """Extract agent dependencies from content."""
        dependencies = []

        # Terms that look like agent names but are procedural
        non_agent_terms = {
            'Self-Correction', 'Self-Review', 'Quality-Check',
            'Cross-Reference', 'Double-Check', 'Final-Review'
        }

        # Look for "Dependencies" section only - don't parse workflow text
        # as it often contains procedural terms that look like agent names
        deps_match = re.search(r'##\s+Dependencies?\s*\n(.*?)(?=\n##|\Z)', content, re.DOTALL | re.IGNORECASE)
        if deps_match:
            deps_text = deps_match.group(1)
            # Extract agent names (typically in list format)
            agent_matches = re.findall(r'[-*]\s*([A-Za-z-]+(?:-[A-Za-z]+)*)', deps_text)
            dependencies.extend(agent_matches)

        # Remove duplicates, normalize, and filter out non-agent terms
        dependencies = list(set([d.strip() for d in dependencies if d and d not in non_agent_terms]))
        return dependencies
    
    def _extract_section(self, content: str, section_name: str) -> List[str]:
        """Extract items from a section (e.g., Inputs, Outputs)."""
        items = []
        
        # Look for section with various heading levels
        pattern = rf'##+\s+{section_name}.*?\n(.*?)(?=\n##|\Z)'
        match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
        if match:
            section_text = match.group(1)
            # Extract list items
            list_items = re.findall(r'[-*]\s*(.+?)(?=\n[-*]|\n\n|\Z)', section_text, re.DOTALL)
            items.extend([item.strip() for item in list_items if item.strip()])
        
        return items
    
    def get_agent(self, name: str) -> Optional[AgentSkill]:
        """
        Get an agent by name.
        
        Args:
            name: Agent name (e.g., "Compliance-Check")
            
        Returns:
            AgentSkill object or None if not found
        """
        return self._agents.get(name)
    
    def list_agents(self) -> List[str]:
        """Get list of all registered agent names."""
        return list(self._agents.keys())
    
    def get_agent_dependencies(self, agent_name: str) -> List[str]:
        """
        Get dependencies for an agent.
        
        Args:
            agent_name: Name of the agent
            
        Returns:
            List of dependency agent names
        """
        agent = self.get_agent(agent_name)
        if not agent:
            return []
        return agent.dependencies
    
    def find_agents_by_role(self, role_keyword: str) -> List[AgentSkill]:
        """
        Find agents by role keyword in their description.
        
        Args:
            role_keyword: Keyword to search for (e.g., "Writer", "Compliance")
            
        Returns:
            List of matching AgentSkill objects
        """
        matches = []
        keyword_lower = role_keyword.lower()
        
        for agent in self._agents.values():
            if keyword_lower in agent.description.lower() or keyword_lower in agent.content.lower():
                matches.append(agent)
        
        return matches
    
    def validate_dependencies(self) -> Dict[str, List[str]]:
        """
        Validate that all agent dependencies exist.
        
        Returns:
            Dict mapping agent names to lists of missing dependencies
        """
        missing = {}
        
        for agent_name, agent in self._agents.items():
            missing_deps = []
            for dep in agent.dependencies:
                if dep not in self._agents:
                    missing_deps.append(dep)
            if missing_deps:
                missing[agent_name] = missing_deps
        
        return missing
    
    def get_agent_metadata(self, agent_name: str) -> Dict[str, Any]:
        """
        Get full metadata for an agent.
        
        Args:
            agent_name: Name of the agent
            
        Returns:
            Dict with agent metadata
        """
        agent = self.get_agent(agent_name)
        if not agent:
            return {}
        
        return {
            "name": agent.name,
            "description": agent.description,
            "skill_path": str(agent.skill_path),
            "dependencies": agent.dependencies,
            "inputs": agent.inputs,
            "outputs": agent.outputs,
            "frontmatter": agent.frontmatter
        }


# Global registry instance
_registry: Optional[AgentRegistry] = None


def get_registry() -> AgentRegistry:
    """Get or create the global agent registry."""
    global _registry
    if _registry is None:
        _registry = AgentRegistry()
    return _registry
