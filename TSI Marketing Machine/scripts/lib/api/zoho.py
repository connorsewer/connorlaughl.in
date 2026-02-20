"""
Zoho Campaigns API Client for TSI Marketing Machine.

Handles:
- Campaign creation and management
- Email template upload
- List management
- Campaign scheduling and sending

API Docs: https://www.zoho.com/campaigns/help/api/
"""

import os
import json
from typing import Dict, List, Optional, Any
from datetime import datetime

from .base import APIClient, APIError


class ZohoCampaignsClient(APIClient):
    """
    Client for Zoho Campaigns API.

    Environment variables required:
    - ZOHO_CLIENT_ID: OAuth client ID
    - ZOHO_CLIENT_SECRET: OAuth client secret
    - ZOHO_REFRESH_TOKEN: OAuth refresh token
    - ZOHO_ACCOUNT_URL: Account-specific URL (e.g., campaigns.zoho.com)

    Optional:
    - ZOHO_ACCESS_TOKEN: If you want to skip token refresh
    """

    SERVICE_NAME = "zoho"
    BASE_URL = "https://campaigns.zoho.com/api/v1.1"

    def __init__(self, dry_run: bool = False):
        super().__init__(dry_run)
        self._access_token = os.environ.get("ZOHO_ACCESS_TOKEN")
        self._client_id = os.environ.get("ZOHO_CLIENT_ID")
        self._client_secret = os.environ.get("ZOHO_CLIENT_SECRET")
        self._refresh_token = os.environ.get("ZOHO_REFRESH_TOKEN")

    def _get_auth_headers(self) -> Dict[str, str]:
        """Return OAuth authorization headers."""
        if not self._access_token:
            self._refresh_access_token()
        return {
            "Authorization": f"Zoho-oauthtoken {self._access_token}"
        }

    def _refresh_access_token(self):
        """Refresh the OAuth access token using refresh token."""
        if not all([self._client_id, self._client_secret, self._refresh_token]):
            raise APIError(
                "Missing Zoho OAuth credentials. Set ZOHO_CLIENT_ID, "
                "ZOHO_CLIENT_SECRET, and ZOHO_REFRESH_TOKEN environment variables."
            )

        if self.dry_run:
            self.logger.info("[DRY-RUN] Would refresh access token", operation="auth")
            self._access_token = "dry-run-token"
            return

        # Token refresh URL
        token_url = "https://accounts.zoho.com/oauth/v2/token"
        params = {
            "refresh_token": self._refresh_token,
            "client_id": self._client_id,
            "client_secret": self._client_secret,
            "grant_type": "refresh_token"
        }

        import urllib.request
        import urllib.parse

        data = urllib.parse.urlencode(params).encode('utf-8')
        request = urllib.request.Request(token_url, data=data, method="POST")

        try:
            with urllib.request.urlopen(request) as response:
                result = json.loads(response.read().decode('utf-8'))
                self._access_token = result.get("access_token")
                if not self._access_token:
                    raise APIError("No access token in refresh response")
                self.logger.info("Access token refreshed", operation="auth")
        except Exception as e:
            raise APIError(f"Token refresh failed: {e}")

    def test_connection(self) -> bool:
        """Test API connection by fetching account info."""
        try:
            status, response = self.get("/getmailinglist")
            return status == 200
        except APIError as e:
            self.logger.error(f"Connection test failed: {e.message}", operation="test")
            return False

    # =========================================================================
    # Campaign Management
    # =========================================================================

    def create_campaign(
        self,
        campaign_name: str,
        subject: str,
        from_email: str,
        from_name: str,
        content_html: str,
        content_text: Optional[str] = None,
        list_key: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Create a new email campaign.

        Args:
            campaign_name: Internal name for the campaign
            subject: Email subject line
            from_email: Sender email address
            from_name: Sender display name
            content_html: HTML email content
            content_text: Plain text version (optional)
            list_key: Mailing list key to send to

        Returns:
            Campaign creation response with campaign_key
        """
        self.logger.info(f"Creating campaign: {campaign_name}", operation="create_campaign")

        payload = {
            "campaignname": campaign_name,
            "subject": subject,
            "from_email": from_email,
            "from_name": from_name,
            "content": content_html,
        }

        if content_text:
            payload["text_content"] = content_text

        if list_key:
            payload["listkey"] = list_key

        status, response = self.post("/createcampaign", payload)

        if status == 200 and response.get("status") == "success":
            campaign_key = response.get("campaign_key")
            self.logger.info(f"Campaign created: {campaign_key}", operation="create_campaign",
                           data={"campaign_key": campaign_key})
            return response
        else:
            raise APIError(f"Campaign creation failed: {response}", status_code=status)

    def get_campaigns(self, status_filter: str = "all") -> List[Dict]:
        """
        Get list of campaigns.

        Args:
            status_filter: Filter by status (all, draft, sent, scheduled)

        Returns:
            List of campaign objects
        """
        self.logger.info(f"Fetching campaigns (filter: {status_filter})", operation="list_campaigns")

        endpoint = f"/getcampaignlist?status={status_filter}"
        status, response = self.get(endpoint)

        if status == 200:
            campaigns = response.get("list_of_campaigns", [])
            self.logger.info(f"Found {len(campaigns)} campaigns", operation="list_campaigns")
            return campaigns
        else:
            raise APIError(f"Failed to fetch campaigns: {response}", status_code=status)

    def schedule_campaign(
        self,
        campaign_key: str,
        send_time: Optional[datetime] = None
    ) -> Dict:
        """
        Schedule a campaign for sending.

        Args:
            campaign_key: Campaign identifier
            send_time: When to send (None = send immediately)

        Returns:
            Scheduling response
        """
        self.logger.info(f"Scheduling campaign: {campaign_key}", operation="schedule_campaign")

        payload = {"campaignkey": campaign_key}

        if send_time:
            payload["send_time"] = send_time.strftime("%Y-%m-%d %H:%M:%S")
            payload["send_type"] = "schedule"
        else:
            payload["send_type"] = "now"

        status, response = self.post("/schedulecampaign", payload)

        if status == 200 and response.get("status") == "success":
            self.logger.info(f"Campaign scheduled", operation="schedule_campaign",
                           data={"campaign_key": campaign_key, "send_type": payload["send_type"]})
            return response
        else:
            raise APIError(f"Scheduling failed: {response}", status_code=status)

    # =========================================================================
    # Mailing List Management
    # =========================================================================

    def get_mailing_lists(self) -> List[Dict]:
        """Get all mailing lists."""
        self.logger.info("Fetching mailing lists", operation="list_mailing_lists")

        status, response = self.get("/getmailinglist")

        if status == 200:
            lists = response.get("list_of_details", [])
            self.logger.info(f"Found {len(lists)} mailing lists", operation="list_mailing_lists")
            return lists
        else:
            raise APIError(f"Failed to fetch mailing lists: {response}", status_code=status)

    def add_subscriber(
        self,
        list_key: str,
        email: str,
        first_name: Optional[str] = None,
        last_name: Optional[str] = None,
        **custom_fields
    ) -> Dict:
        """
        Add a subscriber to a mailing list.

        Args:
            list_key: Mailing list identifier
            email: Subscriber email
            first_name: Subscriber first name
            last_name: Subscriber last name
            **custom_fields: Additional custom fields

        Returns:
            Subscription response
        """
        self.logger.info(f"Adding subscriber to list", operation="add_subscriber",
                        data={"list_key": list_key, "email": email[:3] + "***"})

        payload = {
            "listkey": list_key,
            "contactinfo": {
                "Contact Email": email,
            }
        }

        if first_name:
            payload["contactinfo"]["First Name"] = first_name
        if last_name:
            payload["contactinfo"]["Last Name"] = last_name

        payload["contactinfo"].update(custom_fields)

        status, response = self.post("/listsubscribe", payload)

        if status == 200 and response.get("status") == "success":
            self.logger.info("Subscriber added", operation="add_subscriber")
            return response
        else:
            raise APIError(f"Failed to add subscriber: {response}", status_code=status)

    # =========================================================================
    # Campaign Reports
    # =========================================================================

    def get_campaign_report(self, campaign_key: str) -> Dict:
        """
        Get campaign performance report.

        Args:
            campaign_key: Campaign identifier

        Returns:
            Report with opens, clicks, bounces, etc.
        """
        self.logger.info(f"Fetching campaign report", operation="get_report",
                        data={"campaign_key": campaign_key})

        endpoint = f"/getcampaignreport?campaignkey={campaign_key}"
        status, response = self.get(endpoint)

        if status == 200:
            self.logger.info("Report fetched", operation="get_report",
                           data={"campaign_key": campaign_key})
            return response
        else:
            raise APIError(f"Failed to fetch report: {response}", status_code=status)


def create_zoho_payload(
    title: str,
    vertical: str,
    content_html: str,
    subject_line: str,
    from_name: str = "TSI",
    from_email: str = "marketing@tsico.com"
) -> Dict:
    """
    Helper function to create a standardized Zoho campaign payload.

    Args:
        title: Campaign title
        vertical: Target vertical (ARM, Healthcare, etc.)
        content_html: HTML email content
        subject_line: Email subject
        from_name: Sender name
        from_email: Sender email

    Returns:
        Dict formatted for Zoho API
    """
    campaign_name = f"{datetime.now().strftime('%Y-%m-%d')}_{vertical}_{title.replace(' ', '_')}"

    return {
        "campaign_name": campaign_name,
        "subject": subject_line,
        "from_name": from_name,
        "from_email": from_email,
        "content_html": content_html,
        "metadata": {
            "vertical": vertical,
            "created_at": datetime.now().isoformat(),
            "source": "TSI Marketing Machine"
        }
    }
