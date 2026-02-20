import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type {
  Asset,
  AssetSummary,
  AssetFrontmatter,
  IntelBriefing,
  IntelAlert,
  SystemHealth,
  AutopilotAction,
  PublishableItem,
  Vertical,
  ContentType,
  ContentStatus,
  HealthStatus,
  VaultFilters,
} from './types';

// Base path to parent directory (TSI Marketing Machine)
const BASE_PATH = path.join(process.cwd(), '..');

// Directory paths
const PATHS = {
  finalAssets: path.join(BASE_PATH, 'final_assets'),
  drafts: path.join(BASE_PATH, 'drafts'),
  intelligence: path.join(BASE_PATH, 'docs', 'intelligence'),
  reports: path.join(BASE_PATH, 'docs', 'reports'),
  systemLogs: path.join(BASE_PATH, 'system_logs'),
  healthFile: path.join(BASE_PATH, 'system_logs', 'daily_health.md'),
  autopilotLog: path.join(BASE_PATH, 'docs', 'reports', 'autopilot_log.md'),
  publishQueue: path.join(BASE_PATH, 'final_assets', 'ready_to_publish'),
};

// Helper: Parse content type from string
function parseContentType(str?: string): ContentType {
  if (!str) return 'Unknown';
  const normalized = str.toLowerCase().replace(/[^a-z]/g, '');
  const mapping: Record<string, ContentType> = {
    email: 'Email',
    linkedin: 'LinkedIn',
    linkedinpost: 'LinkedIn',
    brochure: 'Brochure',
    casestudy: 'CaseStudy',
    whitepaper: 'Whitepaper',
    blogpost: 'BlogPost',
    blog: 'BlogPost',
    salesemail: 'SalesEmail',
    newsletter: 'Newsletter',
    webpage: 'WebPage',
    web: 'WebPage',
    contentpackage: 'ContentPackage',
    compliancereview: 'ComplianceReview',
  };
  return mapping[normalized] || 'Unknown';
}

// Helper: Parse vertical from string
function parseVertical(str?: string): Vertical {
  if (!str) return 'ARM';
  const normalized = str.toLowerCase().replace(/[^a-z]/g, '');
  if (normalized.includes('arm') || normalized.includes('receivable') || normalized.includes('debt')) {
    return 'ARM';
  }
  if (normalized.includes('health') || normalized.includes('rcm')) {
    return 'Healthcare';
  }
  if (normalized.includes('bpo') || normalized.includes('customer')) {
    return 'BPO';
  }
  if (normalized.includes('debtnext') || normalized.includes('rrm')) {
    return 'DebtNext';
  }
  if (normalized.includes('loan') || normalized.includes('servic')) {
    return 'LoanServicing';
  }
  return 'ARM';
}

// Helper: Parse status from string
function parseStatus(str?: string): ContentStatus {
  if (!str) return 'DRAFT';
  const normalized = str.toUpperCase();
  if (normalized.includes('PUBLISH')) return 'PUBLISHED';
  if (normalized.includes('APPROV')) return 'APPROVED';
  if (normalized.includes('ARCHIV')) return 'ARCHIVED';
  return 'DRAFT';
}

// Helper: Extract date from filename or frontmatter
function extractDate(filename: string, frontmatter?: { date?: string | Date }): string {
  if (frontmatter?.date) {
    // Handle Date objects or strings
    const dateVal = frontmatter.date;
    if (dateVal instanceof Date) {
      return dateVal.toISOString().split('T')[0];
    }
    if (typeof dateVal === 'string') {
      return dateVal;
    }
    // Fallback for unexpected types
    return String(dateVal);
  }
  const match = filename.match(/(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : new Date().toISOString().split('T')[0];
}

// Helper: Create slug from filename
function createSlug(filename: string): string {
  return filename.replace(/\.md$/, '').replace(/[^a-zA-Z0-9-_]/g, '-');
}

// Helper: Recursively get all markdown files in directory
function getMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath));
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Helper: Parse markdown to HTML
async function parseMarkdown(content: string): Promise<string> {
  const result = await remark().use(html).process(content);
  return result.toString();
}

// Get recent assets from final_assets and drafts
export async function getRecentAssets(limit: number = 10, vertical?: Vertical): Promise<AssetSummary[]> {
  const assets: AssetSummary[] = [];

  // Get from both final_assets and drafts
  const dirs = [PATHS.finalAssets, PATHS.drafts];

  for (const dir of dirs) {
    const files = getMarkdownFiles(dir);

    for (const filePath of files) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(content);
        const filename = path.basename(filePath);

        const assetVertical = parseVertical(data.vertical);
        if (vertical && assetVertical !== vertical) continue;

        assets.push({
          slug: createSlug(filename),
          title: data.title || filename.replace(/\.md$/, '').replace(/[-_]/g, ' '),
          vertical: assetVertical,
          contentType: parseContentType(data.content_type),
          status: parseStatus(data.status),
          date: extractDate(filename, data),
          excerpt: content.slice(0, 200).replace(/^---[\s\S]*?---/, '').trim(),
          filePath,
        });
      } catch {
        // Skip files that can't be read
      }
    }
  }

  // Sort by date descending and limit
  return assets
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .slice(0, limit);
}

// Get all assets with filters
export async function getAllAssets(filters?: VaultFilters): Promise<AssetSummary[]> {
  const assets = await getRecentAssets(1000);

  if (!filters) return assets;

  return assets.filter((asset) => {
    if (filters.search) {
      const search = filters.search.toLowerCase();
      if (!asset.title.toLowerCase().includes(search)) return false;
    }
    if (filters.verticals?.length && !filters.verticals.includes(asset.vertical)) {
      return false;
    }
    if (filters.contentTypes?.length && !filters.contentTypes.includes(asset.contentType)) {
      return false;
    }
    if (filters.statuses?.length && !filters.statuses.includes(asset.status)) {
      return false;
    }
    if (filters.dateRange) {
      if (asset.date < filters.dateRange.start || asset.date > filters.dateRange.end) {
        return false;
      }
    }
    return true;
  });
}

// Get single asset by slug
export async function getAssetBySlug(slug: string): Promise<Asset | null> {
  const dirs = [PATHS.finalAssets, PATHS.drafts];

  for (const dir of dirs) {
    const files = getMarkdownFiles(dir);

    for (const filePath of files) {
      const filename = path.basename(filePath);
      if (createSlug(filename) === slug) {
        try {
          const rawMarkdown = fs.readFileSync(filePath, 'utf-8');
          const { data, content: markdownContent } = matter(rawMarkdown);
          const htmlContent = await parseMarkdown(markdownContent);

          return {
            slug,
            title: data.title || filename.replace(/\.md$/, '').replace(/[-_]/g, ' '),
            vertical: parseVertical(data.vertical),
            contentType: parseContentType(data.content_type),
            status: parseStatus(data.status),
            date: extractDate(filename, data),
            content: htmlContent,
            rawMarkdown,
            frontmatter: data as AssetFrontmatter,
            filePath,
          };
        } catch {
          return null;
        }
      }
    }
  }

  return null;
}

// Get intel briefings
export async function getIntelBriefings(limit: number = 20, vertical?: Vertical): Promise<IntelBriefing[]> {
  const briefings: IntelBriefing[] = [];
  const files = getMarkdownFiles(PATHS.intelligence);

  for (const filePath of files) {
    const filename = path.basename(filePath);

    // Only process intel briefing files
    if (!filename.startsWith('intel_briefing_')) continue;

    try {
      const rawContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(rawContent);

      // Extract vertical from filename (e.g., intel_briefing_2026-01-21_ARM.md)
      const verticalMatch = filename.match(/intel_briefing_\d{4}-\d{2}-\d{2}_(\w+)\.md/i);
      const briefingVertical = parseVertical(verticalMatch?.[1] || data.vertical);

      if (vertical && briefingVertical !== vertical) continue;

      // Parse alerts from content
      const alerts: IntelAlert[] = [];
      const alertMatches = content.matchAll(/###\s*(.+?)\n\*\s*\*\*Link\*\*:\s*(\S+)\n\*\s*\*\*Date\*\*:\s*(.+)/g);

      for (const match of alertMatches) {
        alerts.push({
          type: 'market',
          title: match[1].trim(),
          summary: `Source: ${match[2]}`,
          source: match[2],
          urgency: 'medium',
        });
      }

      briefings.push({
        id: createSlug(filename),
        date: extractDate(filename, data),
        vertical: briefingVertical,
        title: data.title || `${briefingVertical} Market Intel`,
        alerts,
        recommendation: content.match(/## Recommendation\n(.+)/)?.[1]?.trim(),
        content: await parseMarkdown(content),
        filePath,
      });
    } catch {
      // Skip files that can't be read
    }
  }

  return briefings
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .slice(0, limit);
}

// Get system health status
export async function getSystemHealth(): Promise<SystemHealth> {
  const defaultHealth: SystemHealth = {
    status: 'GREEN',
    message: 'System operational',
    lastCheck: new Date().toISOString(),
    details: {
      agentsOnline: 22,
      totalAgents: 22,
      publishQueueCount: 0,
      recentErrors: [],
    },
  };

  try {
    if (!fs.existsSync(PATHS.healthFile)) {
      return defaultHealth;
    }

    const content = fs.readFileSync(PATHS.healthFile, 'utf-8');

    // Parse the markdown table for the latest status
    const lines = content.split('\n');
    let lastStatus: HealthStatus = 'GREEN';
    let lastMessage = 'System operational';
    let lastDate = new Date().toISOString().split('T')[0];

    for (const line of lines) {
      const match = line.match(/\|\s*(\d{4}-\d{2}-\d{2})\s*\|\s*(GREEN|YELLOW|RED)\s*\|\s*(.+?)\s*\|/);
      if (match) {
        lastDate = match[1];
        lastStatus = match[2] as HealthStatus;
        lastMessage = match[3];
      }
    }

    // Count publish queue items
    let publishQueueCount = 0;
    if (fs.existsSync(PATHS.publishQueue)) {
      publishQueueCount = getMarkdownFiles(PATHS.publishQueue).length;
    }

    return {
      status: lastStatus,
      message: lastMessage,
      lastCheck: lastDate,
      details: {
        agentsOnline: 22,
        totalAgents: 22,
        publishQueueCount,
        recentErrors: [],
      },
    };
  } catch {
    return defaultHealth;
  }
}

// Get recent autopilot actions
export async function getRecentActions(limit: number = 10): Promise<AutopilotAction[]> {
  const actions: AutopilotAction[] = [];

  try {
    if (!fs.existsSync(PATHS.autopilotLog)) {
      return actions;
    }

    const content = fs.readFileSync(PATHS.autopilotLog, 'utf-8');
    const blocks = content.split(/### Run: /);

    for (const block of blocks) {
      if (!block.trim()) continue;

      // Extract timestamp
      const timestampMatch = block.match(/^(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})/);
      if (!timestampMatch) continue;

      const timestamp = timestampMatch[1];

      // Extract actions
      const actionLines = block.split('\n').filter((line) => line.startsWith('*'));

      for (const line of actionLines) {
        const verticalMatch = line.match(/\[(\w+)\]/);
        const vertical = verticalMatch ? parseVertical(verticalMatch[1]) : undefined;

        // Determine action type and details
        let action = 'System Activity';
        let details = line.replace(/^\*\s*/, '').replace(/\[.*?\]\s*/, '').trim();
        let status: AutopilotAction['status'] = 'info';

        if (line.includes('News found')) {
          action = 'Intel Gathered';
          status = 'success';
        } else if (line.includes('Draft')) {
          action = 'Draft Created';
          status = 'success';
        } else if (line.includes('workflows executed')) {
          action = 'Workflows Executed';
          status = 'success';
        } else if (line.includes('Error') || line.includes('error')) {
          status = 'error';
        } else if (line.includes('Warning') || line.includes('warning')) {
          status = 'warning';
        }

        actions.push({
          timestamp,
          vertical,
          action,
          details,
          status,
        });
      }
    }
  } catch {
    // Return empty array on error
  }

  // Sort by timestamp descending and limit
  return actions
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, limit);
}

// Get publishable items from queue
export async function getPublishQueue(): Promise<PublishableItem[]> {
  const items: PublishableItem[] = [];

  // Check for ready_to_publish directory
  if (!fs.existsSync(PATHS.publishQueue)) {
    // Also check for APPROVED items in final_assets
    const assets = await getRecentAssets(100);
    return assets
      .filter((a) => a.status === 'APPROVED')
      .map((a) => ({
        id: a.slug,
        path: a.filePath,
        platform: a.contentType === 'LinkedIn' ? 'linkedin' as const : 'zoho' as const,
        title: a.title,
        vertical: a.vertical,
        contentType: a.contentType,
      }));
  }

  const files = getMarkdownFiles(PATHS.publishQueue);

  for (const filePath of files) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(content);
      const filename = path.basename(filePath);

      items.push({
        id: createSlug(filename),
        path: filePath,
        platform: data.platform || (data.content_type === 'LinkedIn' ? 'linkedin' : 'zoho'),
        title: data.title || filename.replace(/\.md$/, ''),
        vertical: parseVertical(data.vertical),
        contentType: parseContentType(data.content_type),
        scheduledFor: data.scheduled_for,
      });
    } catch {
      // Skip files that can't be read
    }
  }

  return items;
}
