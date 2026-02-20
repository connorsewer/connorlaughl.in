"""
TSI Marketing Machine - Workflow State Management

Tracks artifact state transitions and enables querying workflow status.
"""

import os
import json
from pathlib import Path
from typing import Dict, List, Optional, Any
from datetime import datetime
from enum import Enum

import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from lib.logger import get_logger

logger = get_logger("workflow_state")


class ArtifactState(Enum):
    """Artifact state in the workflow."""
    DRAFT = "draft"
    IN_REVIEW = "in_review"
    REJECTED = "rejected"
    APPROVED = "approved"
    FORMATTED = "formatted"
    PUBLISHED = "published"
    ARCHIVED = "archived"


class WorkflowState:
    """
    Manages workflow state for artifacts.
    
    Tracks state transitions and enables querying for stuck workflows.
    """
    
    def __init__(self, state_dir: Optional[Path] = None):
        """
        Initialize workflow state manager.
        
        Args:
            state_dir: Directory for state files. If None, uses drafts/.state/
        """
        if state_dir is None:
            script_dir = Path(__file__).parent.parent.parent
            state_dir = script_dir / "drafts" / ".state"
        
        self.state_dir = Path(state_dir)
        self.state_dir.mkdir(parents=True, exist_ok=True)
    
    def get_state_file(self, artifact_id: str) -> Path:
        """Get path to state file for an artifact."""
        return self.state_dir / f"{artifact_id}.json"
    
    def create_artifact(self, artifact_id: str, initial_state: ArtifactState = ArtifactState.DRAFT,
                       metadata: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Create a new artifact state record.
        
        Args:
            artifact_id: Unique identifier for the artifact
            initial_state: Initial state
            metadata: Optional metadata (vertical, type, etc.)
            
        Returns:
            State record dictionary
        """
        state_record = {
            "artifact_id": artifact_id,
            "state": initial_state.value,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
            "transitions": [{
                "state": initial_state.value,
                "timestamp": datetime.utcnow().isoformat(),
                "agent": "system"
            }],
            "metadata": metadata or {}
        }
        
        state_file = self.get_state_file(artifact_id)
        with open(state_file, 'w') as f:
            json.dump(state_record, f, indent=2)
        
        logger.info(f"Created artifact state: {artifact_id}",
                   operation="create_artifact",
                   data={"state": initial_state.value})
        
        return state_record
    
    def transition_state(self, artifact_id: str, new_state: ArtifactState,
                        agent: str, notes: Optional[str] = None) -> Dict[str, Any]:
        """
        Transition an artifact to a new state.
        
        Args:
            artifact_id: Artifact identifier
            new_state: New state to transition to
            agent: Agent performing the transition
            notes: Optional notes about the transition
            
        Returns:
            Updated state record
        """
        state_file = self.get_state_file(artifact_id)
        
        if not state_file.exists():
            logger.warning(f"Artifact state not found: {artifact_id}. Creating new record.",
                         operation="transition_state")
            return self.create_artifact(artifact_id, new_state)
        
        with open(state_file, 'r') as f:
            state_record = json.load(f)
        
        old_state = state_record.get("state")
        state_record["state"] = new_state.value
        state_record["updated_at"] = datetime.utcnow().isoformat()
        
        transition = {
            "from_state": old_state,
            "to_state": new_state.value,
            "timestamp": datetime.utcnow().isoformat(),
            "agent": agent
        }
        if notes:
            transition["notes"] = notes
        
        state_record["transitions"].append(transition)
        
        with open(state_file, 'w') as f:
            json.dump(state_record, f, indent=2)
        
        logger.info(f"State transition: {artifact_id} {old_state} -> {new_state.value}",
                   operation="transition_state",
                   agent=agent,
                   data={"from": old_state, "to": new_state.value})
        
        return state_record
    
    def get_state(self, artifact_id: str) -> Optional[Dict[str, Any]]:
        """
        Get current state for an artifact.
        
        Args:
            artifact_id: Artifact identifier
            
        Returns:
            State record or None if not found
        """
        state_file = self.get_state_file(artifact_id)
        
        if not state_file.exists():
            return None
        
        with open(state_file, 'r') as f:
            return json.load(f)
    
    def query_by_state(self, state: ArtifactState, 
                      metadata_filter: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
        """
        Query artifacts by state.
        
        Args:
            state: State to filter by
            metadata_filter: Optional metadata filters (e.g., {"vertical": "ARM"})
            
        Returns:
            List of matching state records
        """
        matches = []
        
        if not self.state_dir.exists():
            return matches
        
        for state_file in self.state_dir.glob("*.json"):
            try:
                with open(state_file, 'r') as f:
                    record = json.load(f)
                
                if record.get("state") != state.value:
                    continue
                
                # Apply metadata filter if provided
                if metadata_filter:
                    metadata = record.get("metadata", {})
                    if not all(metadata.get(k) == v for k, v in metadata_filter.items()):
                        continue
                
                matches.append(record)
            except Exception as e:
                logger.warning(f"Failed to read state file {state_file.name}: {e}",
                             operation="query_by_state")
        
        return matches
    
    def find_stuck_artifacts(self, state: ArtifactState, max_age_hours: int = 24) -> List[Dict[str, Any]]:
        """
        Find artifacts stuck in a state for too long.
        
        Args:
            state: State to check
            max_age_hours: Maximum age in hours before considered "stuck"
            
        Returns:
            List of stuck artifact records
        """
        stuck = []
        cutoff_time = datetime.utcnow().timestamp() - (max_age_hours * 3600)
        
        artifacts = self.query_by_state(state)
        
        for artifact in artifacts:
            updated_at = artifact.get("updated_at")
            if updated_at:
                try:
                    updated_timestamp = datetime.fromisoformat(updated_at.replace('Z', '+00:00')).timestamp()
                    if updated_timestamp < cutoff_time:
                        stuck.append(artifact)
                except Exception:
                    pass
        
        if stuck:
            logger.warning(f"Found {len(stuck)} artifacts stuck in {state.value}",
                         operation="find_stuck_artifacts",
                         data={"count": len(stuck), "state": state.value})
        
        return stuck
    
    def get_artifact_history(self, artifact_id: str) -> List[Dict[str, Any]]:
        """
        Get full transition history for an artifact.
        
        Args:
            artifact_id: Artifact identifier
            
        Returns:
            List of state transitions
        """
        state_record = self.get_state(artifact_id)
        if not state_record:
            return []
        
        return state_record.get("transitions", [])
    
    def delete_artifact_state(self, artifact_id: str):
        """
        Delete state record for an artifact (e.g., after archival).
        
        Args:
            artifact_id: Artifact identifier
        """
        state_file = self.get_state_file(artifact_id)
        
        if state_file.exists():
            state_file.unlink()
            logger.info(f"Deleted artifact state: {artifact_id}",
                       operation="delete_artifact_state")


# Global workflow state instance
_workflow_state: Optional[WorkflowState] = None


def get_workflow_state() -> WorkflowState:
    """Get or create the global workflow state manager."""
    global _workflow_state
    if _workflow_state is None:
        _workflow_state = WorkflowState()
    return _workflow_state
