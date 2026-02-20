import type { Vertical, ContentType, ContentStatus, Platform, HealthStatus } from './types';

// Vertical configuration
export const VERTICALS: Record<Vertical, {
  name: string;
  abbreviation: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}> = {
  ARM: {
    name: 'Accounts Receivable Management',
    abbreviation: 'ARM',
    color: 'text-vertical-arm',
    bgColor: 'bg-vertical-arm/20',
    borderColor: 'border-vertical-arm/30',
    description: 'Debt Collection, Compliance, Net-back',
  },
  Healthcare: {
    name: 'Healthcare RCM',
    abbreviation: 'HCR',
    color: 'text-vertical-healthcare',
    bgColor: 'bg-vertical-healthcare/20',
    borderColor: 'border-vertical-healthcare/30',
    description: 'Patient Experience, Cash Flow',
  },
  BPO: {
    name: 'BPO & Customer Experience',
    abbreviation: 'BPO',
    color: 'text-vertical-bpo',
    bgColor: 'bg-vertical-bpo/20',
    borderColor: 'border-vertical-bpo/30',
    description: 'Flexibility, Omnichannel',
  },
  DebtNext: {
    name: 'DebtNext RRM',
    abbreviation: 'DNX',
    color: 'text-vertical-debtnext',
    bgColor: 'bg-vertical-debtnext/20',
    borderColor: 'border-vertical-debtnext/30',
    description: 'Inventory Visibility, Compliance',
  },
  LoanServicing: {
    name: 'Loan Servicing',
    abbreviation: 'LSV',
    color: 'text-vertical-loanservicing',
    bgColor: 'bg-vertical-loanservicing/20',
    borderColor: 'border-vertical-loanservicing/30',
    description: 'Higher Ed, UAS',
  },
};

// Vertical color values for dynamic styling
export const VERTICAL_COLORS: Record<Vertical, string> = {
  ARM: '#F97316',
  Healthcare: '#22C55E',
  BPO: '#8B5CF6',
  DebtNext: '#EC4899',
  LoanServicing: '#06B6D4',
};

// Content type icons (Lucide icon names)
export const CONTENT_TYPE_ICONS: Record<ContentType, string> = {
  Email: 'Mail',
  LinkedIn: 'Linkedin',
  Brochure: 'FileText',
  CaseStudy: 'BookOpen',
  Whitepaper: 'ScrollText',
  BlogPost: 'PenLine',
  SalesEmail: 'Send',
  Newsletter: 'Newspaper',
  WebPage: 'Globe',
  ContentPackage: 'Package',
  ComplianceReview: 'ShieldCheck',
  Unknown: 'File',
};

// Content type display names
export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  Email: 'Email Campaign',
  LinkedIn: 'LinkedIn Post',
  Brochure: 'Brochure',
  CaseStudy: 'Case Study',
  Whitepaper: 'Whitepaper',
  BlogPost: 'Blog Post',
  SalesEmail: 'Sales Email',
  Newsletter: 'Newsletter',
  WebPage: 'Web Page',
  ContentPackage: 'Content Package',
  ComplianceReview: 'Compliance Review',
  Unknown: 'Content',
};

// Status badge configuration
export const STATUS_CONFIG: Record<ContentStatus, {
  label: string;
  className: string;
  dotColor: string;
}> = {
  DRAFT: {
    label: 'Draft',
    className: 'status-badge-draft',
    dotColor: 'bg-yellow-400',
  },
  APPROVED: {
    label: 'Approved',
    className: 'status-badge-approved',
    dotColor: 'bg-tsi-blue-light',
  },
  PUBLISHED: {
    label: 'Published',
    className: 'status-badge-published',
    dotColor: 'bg-green-400',
  },
  ARCHIVED: {
    label: 'Archived',
    className: 'status-badge-archived',
    dotColor: 'bg-gray-400',
  },
};

// Health status configuration
export const HEALTH_CONFIG: Record<HealthStatus, {
  label: string;
  color: string;
  bgColor: string;
  glowColor: string;
}> = {
  GREEN: {
    label: 'OPERATIONAL',
    color: 'text-green-400',
    bgColor: 'bg-green-500',
    glowColor: 'shadow-glow-green',
  },
  YELLOW: {
    label: 'DEGRADED',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500',
    glowColor: 'shadow-[0_0_30px_rgba(234,179,8,0.4)]',
  },
  RED: {
    label: 'CRITICAL',
    color: 'text-red-400',
    bgColor: 'bg-red-500',
    glowColor: 'shadow-glow-red',
  },
};

// Platform configuration
export const PLATFORM_CONFIG: Record<Platform, {
  name: string;
  icon: string;
  color: string;
}> = {
  linkedin: {
    name: 'LinkedIn',
    icon: 'Linkedin',
    color: 'text-[#0A66C2]',
  },
  zoho: {
    name: 'Zoho Campaigns',
    icon: 'Mail',
    color: 'text-[#DC2626]',
  },
  web: {
    name: 'Website',
    icon: 'Globe',
    color: 'text-tsi-blue',
  },
};

// Navigation items
export const NAV_ITEMS = [
  {
    label: 'Pulse',
    href: '/',
    icon: 'Activity',
    description: 'System overview and live feed',
  },
  {
    label: 'Intel Room',
    href: '/intel',
    icon: 'Radar',
    description: 'Market intelligence briefings',
  },
  {
    label: 'Vault',
    href: '/vault',
    icon: 'Library',
    description: 'Asset library and content archive',
  },
];

// Quick action items
export const QUICK_ACTIONS = [
  {
    label: 'Run Autopilot',
    icon: 'Zap',
    action: 'autopilot',
    description: 'Execute daily content run',
  },
  {
    label: 'Publish Queue',
    icon: 'Upload',
    action: 'publish',
    description: 'View pending publications',
  },
];

// Parent directory path (relative to tsi-dashboard)
export const PARENT_DIR = '..';

// File paths relative to parent
export const PATHS = {
  finalAssets: `${PARENT_DIR}/final_assets`,
  drafts: `${PARENT_DIR}/drafts`,
  intelligence: `${PARENT_DIR}/docs/intelligence`,
  reports: `${PARENT_DIR}/docs/reports`,
  systemLogs: `${PARENT_DIR}/system_logs`,
  healthFile: `${PARENT_DIR}/system_logs/daily_health.md`,
  autopilotLog: `${PARENT_DIR}/docs/reports/autopilot_log.md`,
  publishQueue: `${PARENT_DIR}/final_assets/ready_to_publish`,
};

// Date format options
export const DATE_FORMATS = {
  display: 'MMM d, yyyy',
  displayWithTime: 'MMM d, yyyy h:mm a',
  iso: 'yyyy-MM-dd',
  relative: true,
};

// Animation variants for Framer Motion
export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideInRight: {
    initial: { opacity: 0, x: '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100%' },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
};
