"""
TSI Marketing Machine - Agent Runtime

Core execution engine for running agents based on their SKILL.md definitions.
Handles agent invocation, workflow routing, and state management.
"""

import os
import json
import time
from pathlib import Path
from typing import Dict, List, Optional, Any, Callable
from datetime import datetime

import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from lib.logger import get_logger
from lib.agent_registry import AgentRegistry, AgentSkill, get_registry

logger = get_logger("agent_runtime")


class AgentExecutionResult:
    """Result of an agent execution."""
    
    def __init__(self, agent_name: str, success: bool, output: Any = None, 
                 error: Optional[str] = None, duration_ms: float = 0.0):
        self.agent_name = agent_name
        self.success = success
        self.output = output
        self.error = error
        self.duration_ms = duration_ms
        self.timestamp = datetime.utcnow().isoformat()
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert result to dictionary for logging."""
        return {
            "agent": self.agent_name,
            "success": self.success,
            "output": str(self.output) if self.output else None,
            "error": self.error,
            "duration_ms": self.duration_ms,
            "timestamp": self.timestamp
        }


class AgentRuntime:
    """
    Runtime engine for executing agents.
    
    This is a framework that can be extended with actual agent implementations.
    In a full implementation, agents would be executed via Claude Code or similar.
    """
    
    def __init__(self, registry: Optional[AgentRegistry] = None):
        """
        Initialize the agent runtime.
        
        Args:
            registry: AgentRegistry instance. If None, uses global registry.
        """
        self.registry = registry or get_registry()
        self._execution_history: List[AgentExecutionResult] = []
        self._agent_handlers: Dict[str, Callable] = {}
    
    def register_handler(self, agent_name: str, handler: Callable):
        """
        Register a handler function for an agent.
        
        Args:
            agent_name: Name of the agent (e.g., "Compliance-Check")
            handler: Callable that executes the agent logic
        """
        self._agent_handlers[agent_name] = handler
        logger.debug(f"Registered handler for {agent_name}", operation="register_handler")
    
    def execute_agent(self, agent_name: str, inputs: Dict[str, Any], 
                     context: Optional[Dict[str, Any]] = None) -> AgentExecutionResult:
        """
        Execute an agent with given inputs.
        
        Args:
            agent_name: Name of the agent to execute
            inputs: Input data for the agent
            context: Optional context (e.g., vertical, campaign_id)
            
        Returns:
            AgentExecutionResult with execution outcome
        """
        start_time = time.time()
        
        # Get agent definition
        agent = self.registry.get_agent(agent_name)
        if not agent:
            error_msg = f"Agent not found: {agent_name}"
            logger.error(error_msg, operation="execute_agent", agent=agent_name)
            return AgentExecutionResult(agent_name, False, error=error_msg, duration_ms=0)
        
        logger.info(f"Executing agent: {agent_name}", 
                   operation="execute_agent",
                   agent=agent_name,
                   data={"inputs": list(inputs.keys())})
        
        # Check for registered handler
        if agent_name in self._agent_handlers:
            try:
                handler = self._agent_handlers[agent_name]
                output = handler(inputs, context or {})
                duration = (time.time() - start_time) * 1000
                
                result = AgentExecutionResult(agent_name, True, output, duration_ms=duration)
                self._execution_history.append(result)
                
                logger.info(f"Agent execution completed: {agent_name}",
                           operation="execute_agent",
                           agent=agent_name,
                           duration_ms=round(duration, 2))
                return result
            except Exception as e:
                duration = (time.time() - start_time) * 1000
                error_msg = f"Handler execution failed: {str(e)}"
                logger.exception(error_msg, operation="execute_agent", agent=agent_name)
                result = AgentExecutionResult(agent_name, False, error=error_msg, duration_ms=duration)
                self._execution_history.append(result)
                return result
        else:
            # No handler registered - return framework result
            duration = (time.time() - start_time) * 1000
            logger.warning(f"No handler registered for {agent_name}. Framework-only execution.",
                          operation="execute_agent",
                          agent=agent_name)
            
            # Return framework result indicating agent definition was found but not executed
            result = AgentExecutionResult(
                agent_name, 
                True, 
                output={"status": "framework_only", "message": "Agent definition found but no handler registered"},
                duration_ms=duration
            )
            self._execution_history.append(result)
            return result
    
    def execute_workflow(self, workflow_steps: List[Dict[str, Any]], 
                        initial_context: Optional[Dict[str, Any]] = None) -> List[AgentExecutionResult]:
        """
        Execute a workflow of multiple agents in sequence.
        
        Args:
            workflow_steps: List of step definitions, each with 'agent' and 'inputs'
            initial_context: Initial context to pass through workflow
            
        Returns:
            List of execution results for each step
        """
        logger.info(f"Executing workflow with {len(workflow_steps)} steps", operation="execute_workflow")
        
        context = initial_context or {}
        results = []
        
        for i, step in enumerate(workflow_steps):
            agent_name = step.get('agent')
            step_inputs = step.get('inputs', {})
            
            if not agent_name:
                logger.error(f"Workflow step {i+1} missing 'agent' field", operation="execute_workflow")
                continue
            
            # Merge context into inputs
            step_inputs = {**context, **step_inputs}
            
            # Execute agent
            result = self.execute_agent(agent_name, step_inputs, context)
            results.append(result)
            
            # If step failed and workflow should stop on error
            if not result.success and step.get('stop_on_error', True):
                logger.error(f"Workflow stopped at step {i+1} due to failure",
                           operation="execute_workflow",
                           agent=agent_name)
                break
            
            # Update context with step output
            if result.output:
                if isinstance(result.output, dict):
                    context.update(result.output)
                else:
                    context[f"{agent_name}_output"] = result.output
        
        logger.info(f"Workflow completed: {len(results)} steps executed",
                   operation="execute_workflow",
                   data={"successful": sum(1 for r in results if r.success)})
        
        return results
    
    def get_execution_history(self, agent_name: Optional[str] = None, 
                             limit: int = 100) -> List[AgentExecutionResult]:
        """
        Get execution history.
        
        Args:
            agent_name: Filter by agent name (optional)
            limit: Maximum number of results to return
            
        Returns:
            List of execution results
        """
        history = self._execution_history
        
        if agent_name:
            history = [r for r in history if r.agent_name == agent_name]
        
        return history[-limit:]
    
    def validate_workflow(self, workflow_steps: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Validate a workflow before execution.
        
        Args:
            workflow_steps: List of workflow step definitions
            
        Returns:
            Validation result with status and any issues found
        """
        issues = []
        
        for i, step in enumerate(workflow_steps):
            agent_name = step.get('agent')
            if not agent_name:
                issues.append(f"Step {i+1}: Missing 'agent' field")
                continue
            
            agent = self.registry.get_agent(agent_name)
            if not agent:
                issues.append(f"Step {i+1}: Agent '{agent_name}' not found in registry")
                continue
            
            # Check dependencies
            deps = agent.dependencies
            for dep in deps:
                if not self.registry.get_agent(dep):
                    issues.append(f"Step {i+1}: Agent '{agent_name}' depends on '{dep}' which is not found")
        
        return {
            "valid": len(issues) == 0,
            "issues": issues,
            "steps": len(workflow_steps)
        }
    
    def get_agent_capabilities(self, agent_name: str) -> Dict[str, Any]:
        """
        Get capabilities and metadata for an agent.
        
        Args:
            agent_name: Name of the agent
            
        Returns:
            Dict with agent capabilities
        """
        agent = self.registry.get_agent(agent_name)
        if not agent:
            return {}
        
        return {
            "name": agent.name,
            "description": agent.description,
            "inputs": agent.inputs,
            "outputs": agent.outputs,
            "dependencies": agent.dependencies,
            "has_handler": agent_name in self._agent_handlers
        }


# Global runtime instance
_runtime: Optional[AgentRuntime] = None


def get_runtime() -> AgentRuntime:
    """Get or create the global agent runtime."""
    global _runtime
    if _runtime is None:
        _runtime = AgentRuntime()
    return _runtime
