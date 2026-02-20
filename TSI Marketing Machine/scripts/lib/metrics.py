"""
TSI Marketing Machine - Metrics Collection

Tracks system metrics: content production rate, compliance pass rate,
API success rate, agent execution times, campaign performance.
"""

import os
import json
from pathlib import Path
from typing import Dict, List, Optional, Any
from datetime import datetime, timedelta
from collections import defaultdict

import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from lib.logger import get_logger

logger = get_logger("metrics")


class MetricsCollector:
    """
    Collects and aggregates system metrics.
    """
    
    def __init__(self, metrics_dir: Optional[Path] = None):
        """
        Initialize metrics collector.
        
        Args:
            metrics_dir: Directory for metrics storage. If None, uses system_logs/metrics/
        """
        if metrics_dir is None:
            script_dir = Path(__file__).parent.parent.parent
            metrics_dir = script_dir / "system_logs" / "metrics"
        
        self.metrics_dir = Path(metrics_dir)
        self.metrics_dir.mkdir(parents=True, exist_ok=True)
        self._daily_metrics: Dict[str, Any] = defaultdict(lambda: {
            "content_produced": 0,
            "compliance_passed": 0,
            "compliance_failed": 0,
            "api_calls": 0,
            "api_success": 0,
            "api_failures": 0,
            "agent_executions": defaultdict(int),
            "agent_durations": defaultdict(list)
        })
    
    def record_content_produced(self, vertical: Optional[str] = None, content_type: Optional[str] = None):
        """Record content production."""
        date_key = datetime.now().strftime("%Y-%m-%d")
        self._daily_metrics[date_key]["content_produced"] += 1
        
        logger.debug("Content production recorded", operation="record_content",
                    data={"vertical": vertical, "type": content_type})
    
    def record_compliance_result(self, passed: bool, vertical: Optional[str] = None):
        """Record compliance check result."""
        date_key = datetime.now().strftime("%Y-%m-%d")
        if passed:
            self._daily_metrics[date_key]["compliance_passed"] += 1
        else:
            self._daily_metrics[date_key]["compliance_failed"] += 1
        
        logger.debug("Compliance result recorded", operation="record_compliance",
                    data={"passed": passed, "vertical": vertical})
    
    def record_api_call(self, platform: str, success: bool, duration_ms: Optional[float] = None):
        """Record API call."""
        date_key = datetime.now().strftime("%Y-%m-%d")
        metrics = self._daily_metrics[date_key]
        metrics["api_calls"] += 1
        
        if success:
            metrics["api_success"] += 1
        else:
            metrics["api_failures"] += 1
        
        logger.debug("API call recorded", operation="record_api",
                    data={"platform": platform, "success": success, "duration_ms": duration_ms})
    
    def record_agent_execution(self, agent_name: str, duration_ms: float, success: bool = True):
        """Record agent execution."""
        date_key = datetime.now().strftime("%Y-%m-%d")
        metrics = self._daily_metrics[date_key]
        metrics["agent_executions"][agent_name] += 1
        metrics["agent_durations"][agent_name].append(duration_ms)
        
        logger.debug("Agent execution recorded", operation="record_agent",
                    agent=agent_name,
                    data={"duration_ms": duration_ms, "success": success})
    
    def get_daily_metrics(self, date: Optional[str] = None) -> Dict[str, Any]:
        """
        Get metrics for a specific date.
        
        Args:
            date: Date in YYYY-MM-DD format. If None, uses today.
            
        Returns:
            Metrics dictionary
        """
        if date is None:
            date = datetime.now().strftime("%Y-%m-%d")
        
        metrics = self._daily_metrics.get(date, {})
        
        # Calculate derived metrics
        if metrics:
            total_compliance = metrics["compliance_passed"] + metrics["compliance_failed"]
            if total_compliance > 0:
                metrics["compliance_pass_rate"] = metrics["compliance_passed"] / total_compliance
            else:
                metrics["compliance_pass_rate"] = 0.0
            
            if metrics["api_calls"] > 0:
                metrics["api_success_rate"] = metrics["api_success"] / metrics["api_calls"]
            else:
                metrics["api_success_rate"] = 0.0
            
            # Calculate average agent execution times
            metrics["agent_avg_durations"] = {}
            for agent, durations in metrics["agent_durations"].items():
                if durations:
                    metrics["agent_avg_durations"][agent] = sum(durations) / len(durations)
        
        return metrics
    
    def get_metrics_summary(self, days: int = 7) -> Dict[str, Any]:
        """
        Get summary metrics for the last N days.
        
        Args:
            days: Number of days to include
            
        Returns:
            Summary metrics
        """
        end_date = datetime.now()
        start_date = end_date - timedelta(days=days)
        
        summary = {
            "period": {
                "start": start_date.strftime("%Y-%m-%d"),
                "end": end_date.strftime("%Y-%m-%d")
            },
            "total_content_produced": 0,
            "total_compliance_checks": 0,
            "compliance_pass_rate": 0.0,
            "total_api_calls": 0,
            "api_success_rate": 0.0,
            "agent_executions": defaultdict(int),
            "agent_avg_durations": defaultdict(list)
        }
        
        current_date = start_date
        while current_date <= end_date:
            date_key = current_date.strftime("%Y-%m-%d")
            daily = self.get_daily_metrics(date_key)
            
            if daily:
                summary["total_content_produced"] += daily.get("content_produced", 0)
                summary["total_compliance_checks"] += (
                    daily.get("compliance_passed", 0) + daily.get("compliance_failed", 0)
                )
                summary["total_api_calls"] += daily.get("api_calls", 0)
                
                for agent, count in daily.get("agent_executions", {}).items():
                    summary["agent_executions"][agent] += count
                
                for agent, durations in daily.get("agent_durations", {}).items():
                    summary["agent_avg_durations"][agent].extend(durations)
            
            current_date += timedelta(days=1)
        
        # Calculate rates
        if summary["total_compliance_checks"] > 0:
            passed = sum(
                self.get_daily_metrics((start_date + timedelta(days=i)).strftime("%Y-%m-%d")).get("compliance_passed", 0)
                for i in range(days + 1)
            )
            summary["compliance_pass_rate"] = passed / summary["total_compliance_checks"]
        
        if summary["total_api_calls"] > 0:
            success = sum(
                self.get_daily_metrics((start_date + timedelta(days=i)).strftime("%Y-%m-%d")).get("api_success", 0)
                for i in range(days + 1)
            )
            summary["api_success_rate"] = success / summary["total_api_calls"]
        
        # Calculate average durations
        for agent, durations in summary["agent_avg_durations"].items():
            if durations:
                summary["agent_avg_durations"][agent] = sum(durations) / len(durations)
        
        return summary
    
    def save_daily_metrics(self, date: Optional[str] = None):
        """Save daily metrics to file."""
        if date is None:
            date = datetime.now().strftime("%Y-%m-%d")
        
        metrics = self.get_daily_metrics(date)
        metrics_file = self.metrics_dir / f"metrics_{date}.json"
        
        with open(metrics_file, 'w') as f:
            json.dump(metrics, f, indent=2, default=str)
        
        logger.info(f"Metrics saved: {metrics_file.name}", operation="save_metrics")
    
    def load_daily_metrics(self, date: str) -> Optional[Dict[str, Any]]:
        """Load daily metrics from file."""
        metrics_file = self.metrics_dir / f"metrics_{date}.json"
        
        if not metrics_file.exists():
            return None
        
        with open(metrics_file, 'r') as f:
            return json.load(f)


# Global metrics collector instance
_metrics_collector: Optional[MetricsCollector] = None


def get_metrics_collector() -> MetricsCollector:
    """Get or create the global metrics collector."""
    global _metrics_collector
    if _metrics_collector is None:
        _metrics_collector = MetricsCollector()
    return _metrics_collector
