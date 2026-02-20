"""
TSI Marketing Machine - Analytics Integration

Connects Performance-Analyst to campaign performance data from Zoho and LinkedIn.
Aggregates performance data and generates optimization recommendations.
"""

import os
import json
from pathlib import Path
from typing import Dict, List, Optional, Any
from datetime import datetime, timedelta

import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from lib.logger import get_logger
from lib.api import ZohoCampaignsClient, LinkedInClient, APIError

logger = get_logger("analytics")


class AnalyticsCollector:
    """
    Collects and aggregates campaign performance data from external platforms.
    """
    
    def __init__(self):
        """Initialize analytics collector."""
        self.zoho_client = ZohoCampaignsClient(dry_run=False)
        self.linkedin_client = LinkedInClient(dry_run=False)
        self.analytics_dir = Path(__file__).parent.parent.parent / "system_logs" / "analytics"
        self.analytics_dir.mkdir(parents=True, exist_ok=True)
    
    def fetch_zoho_campaign_reports(self, campaign_keys: Optional[List[str]] = None,
                                    days: int = 30) -> List[Dict[str, Any]]:
        """
        Fetch campaign reports from Zoho.
        
        Args:
            campaign_keys: Specific campaign keys to fetch. If None, fetches all recent.
            days: Number of days to look back for campaigns.
            
        Returns:
            List of campaign report dictionaries
        """
        reports = []
        
        try:
            if campaign_keys:
                for key in campaign_keys:
                    try:
                        report = self.zoho_client.get_campaign_report(key)
                        reports.append({
                            "platform": "zoho",
                            "campaign_key": key,
                            "report": report,
                            "fetched_at": datetime.utcnow().isoformat()
                        })
                    except APIError as e:
                        logger.warning(f"Failed to fetch Zoho report for {key}: {e.message}",
                                     operation="fetch_zoho_reports")
            else:
                # Fetch all campaigns from last N days
                campaigns = self.zoho_client.get_campaigns(status_filter="sent")
                cutoff_date = datetime.utcnow() - timedelta(days=days)
                
                for campaign in campaigns:
                    # Filter by date if available
                    campaign_key = campaign.get("campaign_key")
                    if campaign_key:
                        try:
                            report = self.zoho_client.get_campaign_report(campaign_key)
                            reports.append({
                                "platform": "zoho",
                                "campaign_key": campaign_key,
                                "report": report,
                                "fetched_at": datetime.utcnow().isoformat()
                            })
                        except APIError:
                            continue
        except Exception as e:
            logger.error(f"Error fetching Zoho reports: {e}", operation="fetch_zoho_reports")
        
        return reports
    
    def fetch_linkedin_post_analytics(self, post_urns: Optional[List[str]] = None,
                                     days: int = 30) -> List[Dict[str, Any]]:
        """
        Fetch post analytics from LinkedIn.
        
        Args:
            post_urns: Specific post URNs to fetch. If None, fetches recent posts.
            days: Number of days to look back.
            
        Returns:
            List of post analytics dictionaries
        """
        analytics = []
        
        try:
            if post_urns:
                try:
                    analytics_data = self.linkedin_client.get_post_analytics(post_urns)
                    analytics.append({
                        "platform": "linkedin",
                        "post_urns": post_urns,
                        "analytics": analytics_data,
                        "fetched_at": datetime.utcnow().isoformat()
                    })
                except APIError as e:
                    logger.warning(f"Failed to fetch LinkedIn analytics: {e.message}",
                                 operation="fetch_linkedin_analytics")
        except Exception as e:
            logger.error(f"Error fetching LinkedIn analytics: {e}", operation="fetch_linkedin_analytics")
        
        return analytics
    
    def aggregate_performance_data(self, reports: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Aggregate performance data from multiple reports.
        
        Args:
            reports: List of report dictionaries
            
        Returns:
            Aggregated performance metrics
        """
        aggregated = {
            "total_campaigns": len(reports),
            "platforms": {},
            "metrics": {
                "total_opens": 0,
                "total_clicks": 0,
                "total_impressions": 0,
                "total_engagement": 0
            },
            "averages": {}
        }
        
        platform_counts = {}
        
        for report in reports:
            platform = report.get("platform")
            platform_counts[platform] = platform_counts.get(platform, 0) + 1
            
            report_data = report.get("report", {})
            
            # Extract metrics (structure varies by platform)
            if platform == "zoho":
                # Zoho campaign report structure
                opens = report_data.get("opens", 0) or report_data.get("total_opens", 0)
                clicks = report_data.get("clicks", 0) or report_data.get("total_clicks", 0)
                
                aggregated["metrics"]["total_opens"] += opens
                aggregated["metrics"]["total_clicks"] += clicks
            
            elif platform == "linkedin":
                # LinkedIn analytics structure
                analytics = report.get("analytics", {})
                impressions = analytics.get("impressions", 0)
                engagement = analytics.get("engagement", 0)
                
                aggregated["metrics"]["total_impressions"] += impressions
                aggregated["metrics"]["total_engagement"] += engagement
        
        aggregated["platforms"] = platform_counts
        
        # Calculate averages
        if aggregated["total_campaigns"] > 0:
            aggregated["averages"] = {
                "avg_opens": aggregated["metrics"]["total_opens"] / aggregated["total_campaigns"],
                "avg_clicks": aggregated["metrics"]["total_clicks"] / aggregated["total_campaigns"]
            }
        
        return aggregated
    
    def generate_optimization_recommendations(self, aggregated_data: Dict[str, Any],
                                             threshold_open_rate: float = 0.20) -> List[Dict[str, Any]]:
        """
        Generate optimization recommendations based on performance data.
        
        Args:
            aggregated_data: Aggregated performance metrics
            threshold_open_rate: Minimum acceptable open rate (default 20%)
            
        Returns:
            List of recommendation dictionaries
        """
        recommendations = []
        
        # Check open rates
        total_opens = aggregated_data["metrics"].get("total_opens", 0)
        total_sent = aggregated_data.get("total_campaigns", 0)
        
        if total_sent > 0:
            open_rate = total_opens / total_sent if total_sent > 0 else 0
            
            if open_rate < threshold_open_rate:
                recommendations.append({
                    "type": "subject_line_optimization",
                    "severity": "high",
                    "message": f"Open rate ({open_rate*100:.1f}%) below threshold ({threshold_open_rate*100}%)",
                    "recommendation": "Review subject lines. Avoid generic terms. Use specific value propositions.",
                    "metric": f"{open_rate*100:.1f}% open rate"
                })
        
        # Check click rates
        total_clicks = aggregated_data["metrics"].get("total_clicks", 0)
        if total_opens > 0:
            click_rate = total_clicks / total_opens
            if click_rate < 0.05:  # <5% CTR
                recommendations.append({
                    "type": "content_optimization",
                    "severity": "medium",
                    "message": f"Click-through rate ({click_rate*100:.1f}%) is low",
                    "recommendation": "Improve call-to-action clarity and content relevance.",
                    "metric": f"{click_rate*100:.1f}% CTR"
                })
        
        return recommendations
    
    def save_analytics_report(self, aggregated_data: Dict[str, Any],
                             recommendations: List[Dict[str, Any]]):
        """
        Save analytics report to file.
        
        Args:
            aggregated_data: Aggregated performance data
            recommendations: Optimization recommendations
        """
        report = {
            "generated_at": datetime.utcnow().isoformat(),
            "aggregated_data": aggregated_data,
            "recommendations": recommendations
        }
        
        report_file = self.analytics_dir / f"analytics_report_{datetime.now().strftime('%Y%m%d')}.json"
        
        with open(report_file, 'w') as f:
            json.dump(report, f, indent=2, default=str)
        
        logger.info(f"Analytics report saved: {report_file.name}", operation="save_analytics_report")
        
        return report_file


# Global analytics collector instance
_analytics_collector: Optional[AnalyticsCollector] = None


def get_analytics_collector() -> AnalyticsCollector:
    """Get or create the global analytics collector."""
    global _analytics_collector
    if _analytics_collector is None:
        _analytics_collector = AnalyticsCollector()
    return _analytics_collector
