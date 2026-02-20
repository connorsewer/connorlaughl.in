"""
LinkedIn API Client for TSI Marketing Machine.

Handles:
- Company page posts
- Article publishing
- Post analytics
- Image uploads

API Docs: https://learn.microsoft.com/en-us/linkedin/marketing/
"""

import os
import json
from typing import Dict, List, Optional, Any
from datetime import datetime

from .base import APIClient, APIError


class LinkedInClient(APIClient):
    """
    Client for LinkedIn Marketing API.

    Environment variables required:
    - LINKEDIN_ACCESS_TOKEN: OAuth 2.0 access token
    - LINKEDIN_ORGANIZATION_ID: Company page URN (e.g., urn:li:organization:12345)

    Note: LinkedIn tokens typically expire in 60 days and require manual refresh
    through the OAuth flow.
    """

    SERVICE_NAME = "linkedin"
    BASE_URL = "https://api.linkedin.com/v2"

    def __init__(self, dry_run: bool = False):
        super().__init__(dry_run)
        self._access_token = os.environ.get("LINKEDIN_ACCESS_TOKEN")
        self._organization_id = os.environ.get("LINKEDIN_ORGANIZATION_ID")

    def _get_auth_headers(self) -> Dict[str, str]:
        """Return OAuth authorization headers."""
        if not self._access_token:
            raise APIError(
                "Missing LinkedIn access token. Set LINKEDIN_ACCESS_TOKEN environment variable."
            )
        return {
            "Authorization": f"Bearer {self._access_token}",
            "X-Restli-Protocol-Version": "2.0.0",
            "LinkedIn-Version": "202401"
        }

    @property
    def organization_urn(self) -> str:
        """Get the organization URN for company posts."""
        if not self._organization_id:
            raise APIError(
                "Missing LinkedIn organization ID. Set LINKEDIN_ORGANIZATION_ID environment variable."
            )
        # Handle both raw ID and full URN format
        if self._organization_id.startswith("urn:li:organization:"):
            return self._organization_id
        return f"urn:li:organization:{self._organization_id}"

    def test_connection(self) -> bool:
        """Test API connection by fetching organization info."""
        try:
            status, response = self.get(f"/organizations/{self._organization_id}")
            return status == 200
        except APIError as e:
            self.logger.error(f"Connection test failed: {e.message}", operation="test")
            return False

    # =========================================================================
    # Post Management
    # =========================================================================

    def create_text_post(
        self,
        text: str,
        visibility: str = "PUBLIC"
    ) -> Dict[str, Any]:
        """
        Create a text-only post on the company page.

        Args:
            text: Post content (max 3000 characters)
            visibility: PUBLIC or CONNECTIONS

        Returns:
            Post creation response with post URN
        """
        self.logger.info("Creating text post", operation="create_post",
                        data={"text_length": len(text), "visibility": visibility})

        if len(text) > 3000:
            self.logger.warning("Post text truncated to 3000 characters", operation="create_post")
            text = text[:2997] + "..."

        payload = {
            "author": self.organization_urn,
            "lifecycleState": "PUBLISHED",
            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {
                        "text": text
                    },
                    "shareMediaCategory": "NONE"
                }
            },
            "visibility": {
                "com.linkedin.ugc.MemberNetworkVisibility": visibility
            }
        }

        status, response = self.post("/ugcPosts", payload)

        if status in (200, 201):
            post_id = response.get("id")
            self.logger.info(f"Post created: {post_id}", operation="create_post")
            return response
        else:
            raise APIError(f"Post creation failed: {response}", status_code=status)

    def create_link_post(
        self,
        text: str,
        link_url: str,
        link_title: Optional[str] = None,
        link_description: Optional[str] = None,
        visibility: str = "PUBLIC"
    ) -> Dict[str, Any]:
        """
        Create a post with a link preview.

        Args:
            text: Post commentary
            link_url: URL to share
            link_title: Override link title
            link_description: Override link description
            visibility: PUBLIC or CONNECTIONS

        Returns:
            Post creation response
        """
        self.logger.info("Creating link post", operation="create_post",
                        data={"url": link_url[:50], "visibility": visibility})

        media = {
            "status": "READY",
            "originalUrl": link_url
        }

        if link_title:
            media["title"] = {"text": link_title}
        if link_description:
            media["description"] = {"text": link_description}

        payload = {
            "author": self.organization_urn,
            "lifecycleState": "PUBLISHED",
            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {
                        "text": text
                    },
                    "shareMediaCategory": "ARTICLE",
                    "media": [media]
                }
            },
            "visibility": {
                "com.linkedin.ugc.MemberNetworkVisibility": visibility
            }
        }

        status, response = self.post("/ugcPosts", payload)

        if status in (200, 201):
            self.logger.info("Link post created", operation="create_post")
            return response
        else:
            raise APIError(f"Post creation failed: {response}", status_code=status)

    def create_image_post(
        self,
        text: str,
        image_url: str,
        image_title: Optional[str] = None,
        visibility: str = "PUBLIC"
    ) -> Dict[str, Any]:
        """
        Create a post with an image.

        Note: This uses an external image URL. For uploading images directly,
        use the upload_image() method first.

        Args:
            text: Post commentary
            image_url: URL of the image
            image_title: Alt text / title for the image
            visibility: PUBLIC or CONNECTIONS

        Returns:
            Post creation response
        """
        self.logger.info("Creating image post", operation="create_post",
                        data={"image_url": image_url[:50], "visibility": visibility})

        media = {
            "status": "READY",
            "originalUrl": image_url,
            "mediaType": "IMAGE"
        }

        if image_title:
            media["title"] = {"text": image_title}

        payload = {
            "author": self.organization_urn,
            "lifecycleState": "PUBLISHED",
            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {
                        "text": text
                    },
                    "shareMediaCategory": "IMAGE",
                    "media": [media]
                }
            },
            "visibility": {
                "com.linkedin.ugc.MemberNetworkVisibility": visibility
            }
        }

        status, response = self.post("/ugcPosts", payload)

        if status in (200, 201):
            self.logger.info("Image post created", operation="create_post")
            return response
        else:
            raise APIError(f"Post creation failed: {response}", status_code=status)

    # =========================================================================
    # Post Analytics
    # =========================================================================

    def get_post_analytics(
        self,
        post_urns: List[str],
        start_date: Optional[datetime] = None,
        end_date: Optional[datetime] = None
    ) -> Dict[str, Any]:
        """
        Get analytics for posts.

        Args:
            post_urns: List of post URNs to get analytics for
            start_date: Start of date range
            end_date: End of date range

        Returns:
            Analytics data including impressions, clicks, engagement
        """
        self.logger.info("Fetching post analytics", operation="get_analytics",
                        data={"post_count": len(post_urns)})

        # Build query parameters
        shares = ",".join(post_urns)
        endpoint = f"/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity={self.organization_urn}&shares=List({shares})"

        status, response = self.get(endpoint)

        if status == 200:
            self.logger.info("Analytics fetched", operation="get_analytics")
            return response
        else:
            raise APIError(f"Failed to fetch analytics: {response}", status_code=status)

    # =========================================================================
    # Organization Info
    # =========================================================================

    def get_organization_info(self) -> Dict[str, Any]:
        """Get organization/company page information."""
        self.logger.info("Fetching organization info", operation="get_org_info")

        org_id = self._organization_id
        if org_id.startswith("urn:li:organization:"):
            org_id = org_id.split(":")[-1]

        status, response = self.get(f"/organizations/{org_id}")

        if status == 200:
            self.logger.info("Organization info fetched", operation="get_org_info",
                           data={"name": response.get("localizedName", "unknown")})
            return response
        else:
            raise APIError(f"Failed to fetch organization: {response}", status_code=status)


def create_linkedin_payload(
    title: str,
    vertical: str,
    content_text: str,
    link_url: Optional[str] = None,
    hashtags: Optional[List[str]] = None
) -> Dict:
    """
    Helper function to create a standardized LinkedIn post payload.

    Args:
        title: Post title (used in metadata)
        vertical: Target vertical (ARM, Healthcare, etc.)
        content_text: Post text content
        link_url: Optional link to include
        hashtags: Optional list of hashtags

    Returns:
        Dict formatted for LinkedIn posting
    """
    # Add hashtags to content
    if hashtags:
        hashtag_text = " ".join(f"#{tag}" for tag in hashtags)
        content_text = f"{content_text}\n\n{hashtag_text}"

    payload = {
        "text": content_text,
        "metadata": {
            "title": title,
            "vertical": vertical,
            "created_at": datetime.now().isoformat(),
            "source": "TSI Marketing Machine"
        }
    }

    if link_url:
        payload["link_url"] = link_url

    return payload


# Default hashtags by vertical
VERTICAL_HASHTAGS = {
    "ARM": ["DebtCollection", "Compliance", "CFPB", "FinancialServices", "ConsumerFinance"],
    "Healthcare": ["HealthcareRCM", "RevenueCycle", "PatientExperience", "HealthcareFinance"],
    "BPO": ["BPO", "CustomerExperience", "CX", "Outsourcing", "ContactCenter"],
    "DebtNext": ["RevenueRecovery", "FinTech", "DebtManagement", "Compliance"],
    "LoanServicing": ["StudentLoans", "LoanServicing", "HigherEducation", "FinancialAid"]
}
