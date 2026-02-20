// Vertical types
export type Vertical = 'ARM' | 'Healthcare' | 'BPO' | 'DebtNext' | 'LoanServicing';

// Content status lifecycle
export type ContentStatus = 'DRAFT' | 'APPROVED' | 'PUBLISHED' | 'ARCHIVED';

// Content types
export type ContentType =
  | 'Email'
  | 'LinkedIn'
  | 'Brochure'
  | 'CaseStudy'
  | 'Whitepaper'
  | 'BlogPost'
  | 'SalesEmail'
  | 'Newsletter'
  | 'WebPage'
  | 'ContentPackage'
  | 'ComplianceReview'
  | 'Unknown';

// System health status
export type HealthStatus = 'GREEN' | 'YELLOW' | 'RED';

// Platform for publishing
export type Platform = 'linkedin' | 'zoho' | 'web';

// Asset frontmatter from markdown files
export interface AssetFrontmatter {
  title: string;
  vertical: Vertical;
  content_type?: string;
  status?: ContentStatus;
  date?: string;
  author?: string;
  campaign?: string;
  target_audience?: string;
  proof_points?: string[];
  compliance_approved?: boolean;
  platform?: Platform;
  subject_line?: string;
  preview_text?: string;
  [key: string]: unknown;
}

// Full asset with content
export interface Asset {
  slug: string;
  title: string;
  vertical: Vertical;
  contentType: ContentType;
  status: ContentStatus;
  date: string;
  content: string; // Rendered HTML
  rawMarkdown: string;
  frontmatter: AssetFrontmatter;
  filePath: string;
}

// Simplified asset for listings
export interface AssetSummary {
  slug: string;
  title: string;
  vertical: Vertical;
  contentType: ContentType;
  status: ContentStatus;
  date: string;
  excerpt?: string;
  filePath: string;
}

// Intel briefing alert
export interface IntelAlert {
  type: 'regulation' | 'competitor' | 'market' | 'opportunity' | 'risk';
  title: string;
  summary: string;
  source?: string;
  urgency: 'high' | 'medium' | 'low';
}

// Intel briefing document
export interface IntelBriefing {
  id: string;
  date: string;
  vertical: Vertical;
  title: string;
  alerts: IntelAlert[];
  recommendation?: string;
  content: string;
  filePath: string;
}

// System health status
export interface SystemHealth {
  status: HealthStatus;
  message: string;
  lastCheck: string;
  details?: {
    agentsOnline: number;
    totalAgents: number;
    lastAutopilotRun?: string;
    publishQueueCount: number;
    recentErrors: string[];
  };
}

// Autopilot action log entry
export interface AutopilotAction {
  timestamp: string;
  vertical?: Vertical;
  action: string;
  details: string;
  status: 'success' | 'warning' | 'error' | 'info';
  agent?: string;
}

// Publishable item in queue
export interface PublishableItem {
  id: string;
  path: string;
  platform: Platform;
  title: string;
  vertical: Vertical;
  contentType: ContentType;
  scheduledFor?: string;
}

// Dashboard metrics
export interface DashboardMetrics {
  totalAssets: number;
  assetsThisMonth: number;
  publishedThisMonth: number;
  pendingReview: number;
  byVertical: Record<Vertical, number>;
  byStatus: Record<ContentStatus, number>;
}

// Filter options for vault
export interface VaultFilters {
  search?: string;
  verticals?: Vertical[];
  contentTypes?: ContentType[];
  statuses?: ContentStatus[];
  dateRange?: {
    start: string;
    end: string;
  };
}

// Navigation item
export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

// Toast notification
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

// Modal state
export interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
}

// Server action response
export interface ActionResponse<T = void> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
