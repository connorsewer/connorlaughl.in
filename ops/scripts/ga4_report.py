#!/usr/bin/env python3
"""
GA4 Daily Report Script
Fetches Google Analytics 4 data and saves to delta-briefs/ga4_report.md
"""

import os
import sys
from datetime import datetime, timedelta

# Try to import the Google Analytics Data API
try:
    from google.analytics.data import BetaAnalyticsDataClient
    from google.analytics.data import DateRange
    from google.analytics.data import Dimension
    from google.analytics.data import Metric
except ImportError:
    print("ERROR: google-analytics-data library not installed")
    print("Install with: pip install google-analytics-data")
    sys.exit(1)

def get_client():
    """Initialize the Analytics Data API client using gcloud credentials."""
    # Use default credentials (from gcloud auth)
    return BetaAnalyticsDataClient()

def run_report(client, property_id):
    """Run GA4 report for yesterday."""
    
    # Yesterday's date
    today = datetime.now()
    yesterday = today - timedelta(days=1)
    date_str = yesterday.strftime("%Y-%m-%d")
    
    # Overview report - key metrics
    overview_response = client.run_report(
        property=f"properties/{property_id}",
        date_ranges=[DateRange(start_date=date_str, end_date=date_str)],
        metrics=[
            Metric(name="sessions"),
            Metric(name="totalUsers"),
            Metric(name="newUsers"),
            Metric(name="screenPageViews"),
            Metric(name="averageSessionDuration"),
            Metric(name="bounceRate"),
        ],
    )
    
    # Top pages report
    pages_response = client.run_report(
        property=f"properties/{property_id}",
        date_ranges=[DateRange(start_date=date_str, end_date=date_str)],
        dimensions=[Dimension(name="pagePath")],
        metrics=[Metric(name="screenPageViews"), Metric(name="sessions")],
        limit=10,
    )
    
    # Traffic sources
    sources_response = client.run_report(
        property=f"properties/{property_id}",
        date_ranges=[DateRange(start_date=date_str, end_date=date_str)],
        dimensions=[Dimension(name="sessionSource")],
        metrics=[Metric(name="sessions"), Metric(name="totalUsers")],
        limit=10,
    )
    
    return {
        "date": date_str,
        "overview": overview_response,
        "pages": pages_response,
        "sources": sources_response,
    }

def format_report(data):
    """Format the GA4 data as markdown."""
    
    date_str = data["date"]
    overview = data["overview"]
    
    # Extract overview metrics
    row = overview.rows[0] if overview.rows else []
    metrics_names = [m.name for m in overview.metric_headers]
    
    metrics = {}
    if row:
        for i, val in enumerate(row.metric_values):
            metrics[metrics_names[i]] = val.value
    
    # Build markdown report
    md = f"""# GA4 Daily Report

**Date:** {date_str}

## Overview

| Metric | Value |
|--------|-------|
| Sessions | {metrics.get('sessions', 'N/A'):,} |
| Users | {metrics.get('totalUsers', 'N/A'):,} |
| New Users | {metrics.get('newUsers', 'N/A'):,} |
| Page Views | {metrics.get('screenPageViews', 'N/A'):,} |
| Avg Session Duration | {float(metrics.get('averageSessionDuration', 0)):,.1f}s |
| Bounce Rate | {float(metrics.get('bounceRate', 0)):,.1f}% |

## Top Pages

| Page | Views | Sessions |
|------|-------|----------|
"""
    
    for row in data["pages"].rows:
        page = row.dimension_values[0].value
        views = row.metric_values[0].value
        sessions = row.metric_values[1].value
        md += f"| {page} | {int(views):,} | {int(sessions):,} |\n"
    
    md += """
## Traffic Sources

| Source | Sessions | Users |
|--------|----------|-------|
"""
    
    for row in data["sources"].rows:
        source = row.dimension_values[0].value
        sessions = row.metric_values[0].value
        users = row.metric_values[1].value
        md += f"| {source} | {int(sessions):,} | {int(users):,} |\n"
    
    return md

def main():
    """Main entry point."""
    
    # Get property ID from environment variable
    property_id = os.environ.get("GA4_PROPERTY_ID")
    if not property_id:
        print("ERROR: GA4_PROPERTY_ID environment variable not set")
        sys.exit(1)
    
    try:
        property_id = int(property_id)
    except ValueError:
        print(f"ERROR: Invalid GA4_PROPERTY_ID: {property_id}")
        sys.exit(1)
    
    print(f"Fetching GA4 data for property {property_id}...")
    
    client = get_client()
    data = run_report(client, property_id)
    report = format_report(data)
    
    # Save to file
    output_path = "/Users/connorlaughlin/clawd/ops/delta-briefs/ga4_report.md"
    with open(output_path, "w") as f:
        f.write(report)
    
    print(f"Report saved to {output_path}")
    print(f"\n{report}")

if __name__ == "__main__":
    main()
