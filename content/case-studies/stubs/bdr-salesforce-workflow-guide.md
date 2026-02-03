# Case Study: BDR Salesforce Workflow Guide

## Overview
Operational guide for BDRs (Business Development Representatives) using Salesforce Lightning Essentials — covering daily workflows, lead management, campaign tracking, and reporting.

## Key Metrics
- **200** records max for bulk task creation
- **50K** records threshold for Data Import Wizard vs. dataloader.io
- **6** daily workflow time blocks (8:00 AM - 4:45 PM)
- **5** lead status stages (New → Working → Nurturing → Qualified → Disqualified)
- **30-day** stale lead alert threshold

## What Connor Built
- **Complete Daily Workflow Schedule**:
  - 08:00: Assistant widget review (hot items triage)
  - 08:10: "My Unread Leads" list view management
  - 08:15: Inline editing for quick facts
  - 08:30: Bulk task creation (up to 200 records)
  - 09:00: Power-hour call block
  - 11:00: Follow-up email block (Quick Text + Email Engagement)
  - 14:00: Prospecting / sequencing
  - 16:00: Pipeline hygiene sweep (Kanban view)
  - 16:30: Personal dashboard review
  - 16:45: Daily wins / notes documentation

- **Lead List Management**:
  - CSV import requirements and best practices
  - De-duplication settings (Email + Full Name + Company)
  - Owner assignment workflows
  - Bulk Data Load Jobs monitoring

- **Campaign Management Workflow**:
  - Campaign creation (Status = Planned, Active = TRUE)
  - Member addition (Report / List View / Manual)
  - Member status tracking (Email Sent → Called → Replied → Meeting Booked)
  - Campaign influence reporting

- **Lead Qualification Framework**:
  - BANT criteria (Budget, Authority, Need, Timeline)
  - Standard Lead Status progression
  - Custom fields: Pain Point picklist, Company Size
  - GDPR/Do-Not-Call compliance flags
  - Conversion triggers and wizard usage

- **Efficiency Techniques**:
  - List View segmentation and pinning
  - Split view for calling while viewing records
  - Kanban drag-and-drop status management
  - Quick Text for email snippets
  - Einstein Activity Capture (optional)

- **Reporting & Visibility**:
  - BDR self-service reports (Activity Metrics, Leads Worked vs. Converted)
  - Manager dashboards (Productivity, Campaign Influence)
  - Dashboard component specifications

- **Quick Checklist Reference** (7-step daily process)

## What TSI Marketed
- **Salesforce-Enabled BDR Team** - Professional CRM workflows
- **Scalable Lead Management** - Bulk operations and automation
- **Data-Driven Prospecting** - Dashboards and activity tracking
- **Compliance-First Outreach** - GDPR/DNC flag management

## Attribution Clarity
**Connor's Work:** Workflow design, daily schedule optimization, Lightning UI navigation guides, list view configuration, campaign management process, qualification framework, efficiency techniques, reporting specifications, quick reference checklist.

**TSI's Assets:** Salesforce Lightning Essentials licenses, existing lead data, campaign infrastructure, Data Import Wizard access, optional Einstein Activity Capture.

## Strategic Impact
This guide transformed BDR onboarding from ad-hoc training to standardized operational documentation. The time-blocked schedule optimized for Salesforce's UI patterns (Assistant widget, inline editing, bulk actions) improved daily productivity. The qualification framework ensured consistent lead handoff criteria.
