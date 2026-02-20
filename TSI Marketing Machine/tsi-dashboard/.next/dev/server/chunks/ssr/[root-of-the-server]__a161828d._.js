module.exports = [
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs) <export default as minpath>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "minpath",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
}),
"[externals]/node:process [external] (node:process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:process", () => require("node:process"));

module.exports = mod;
}),
"[externals]/node:process [external] (node:process, cjs) <export default as minproc>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "minproc",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$process__$5b$external$5d$__$28$node$3a$process$2c$__cjs$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$process__$5b$external$5d$__$28$node$3a$process$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:process [external] (node:process, cjs)");
}),
"[externals]/node:url [external] (node:url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:url", () => require("node:url"));

module.exports = mod;
}),
"[externals]/node:url [external] (node:url, cjs) <export fileURLToPath as urlToPath>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "urlToPath",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__["fileURLToPath"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:url [external] (node:url, cjs)");
}),
"[project]/lib/file-system.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllAssets",
    ()=>getAllAssets,
    "getAssetBySlug",
    ()=>getAssetBySlug,
    "getIntelBriefings",
    ()=>getIntelBriefings,
    "getPublishQueue",
    ()=>getPublishQueue,
    "getRecentActions",
    ()=>getRecentActions,
    "getRecentAssets",
    ()=>getRecentAssets,
    "getSystemHealth",
    ()=>getSystemHealth
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$gray$2d$matter__$5b$external$5d$__$28$gray$2d$matter$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$gray$2d$matter$29$__ = __turbopack_context__.i("[externals]/gray-matter [external] (gray-matter, cjs, [project]/node_modules/gray-matter)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/remark/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2d$html$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/remark-html/lib/index.js [app-rsc] (ecmascript)");
;
;
;
;
;
// Base path to parent directory (TSI Marketing Machine)
const BASE_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), '..');
// Directory paths
const PATHS = {
    finalAssets: __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(BASE_PATH, 'final_assets'),
    drafts: __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(BASE_PATH, 'drafts'),
    intelligence: __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(BASE_PATH, 'docs', 'intelligence'),
    reports: __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(BASE_PATH, 'docs', 'reports'),
    systemLogs: __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(BASE_PATH, 'system_logs'),
    healthFile: __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(BASE_PATH, 'system_logs', 'daily_health.md'),
    autopilotLog: __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(BASE_PATH, 'docs', 'reports', 'autopilot_log.md'),
    publishQueue: __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(BASE_PATH, 'final_assets', 'ready_to_publish')
};
// Helper: Parse content type from string
function parseContentType(str) {
    if (!str) return 'Unknown';
    const normalized = str.toLowerCase().replace(/[^a-z]/g, '');
    const mapping = {
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
        web: 'WebPage'
    };
    return mapping[normalized] || 'Unknown';
}
// Helper: Parse vertical from string
function parseVertical(str) {
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
function parseStatus(str) {
    if (!str) return 'DRAFT';
    const normalized = str.toUpperCase();
    if (normalized.includes('PUBLISH')) return 'PUBLISHED';
    if (normalized.includes('APPROV')) return 'APPROVED';
    if (normalized.includes('ARCHIV')) return 'ARCHIVED';
    return 'DRAFT';
}
// Helper: Extract date from filename or frontmatter
function extractDate(filename, frontmatter) {
    if (frontmatter?.date) return frontmatter.date;
    const match = filename.match(/(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : new Date().toISOString().split('T')[0];
}
// Helper: Create slug from filename
function createSlug(filename) {
    return filename.replace(/\.md$/, '').replace(/[^a-zA-Z0-9-_]/g, '-');
}
// Helper: Recursively get all markdown files in directory
function getMarkdownFiles(dir) {
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(dir)) return [];
    const files = [];
    const entries = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(dir, {
        withFileTypes: true
    });
    for (const entry of entries){
        const fullPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...getMarkdownFiles(fullPath));
        } else if (entry.name.endsWith('.md')) {
            files.push(fullPath);
        }
    }
    return files;
}
// Helper: Parse markdown to HTML
async function parseMarkdown(content) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["remark"])().use(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2d$html$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]).process(content);
    return result.toString();
}
async function getRecentAssets(limit = 10, vertical) {
    const assets = [];
    // Get from both final_assets and drafts
    const dirs = [
        PATHS.finalAssets,
        PATHS.drafts
    ];
    for (const dir of dirs){
        const files = getMarkdownFiles(dir);
        for (const filePath of files){
            try {
                const content = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(filePath, 'utf-8');
                const { data } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$gray$2d$matter__$5b$external$5d$__$28$gray$2d$matter$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$gray$2d$matter$29$__["default"])(content);
                const filename = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].basename(filePath);
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
                    filePath
                });
            } catch  {
            // Skip files that can't be read
            }
        }
    }
    // Sort by date descending and limit
    return assets.sort((a, b)=>b.date.localeCompare(a.date)).slice(0, limit);
}
async function getAllAssets(filters) {
    const assets = await getRecentAssets(1000);
    if (!filters) return assets;
    return assets.filter((asset)=>{
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
async function getAssetBySlug(slug) {
    const dirs = [
        PATHS.finalAssets,
        PATHS.drafts
    ];
    for (const dir of dirs){
        const files = getMarkdownFiles(dir);
        for (const filePath of files){
            const filename = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].basename(filePath);
            if (createSlug(filename) === slug) {
                try {
                    const rawMarkdown = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(filePath, 'utf-8');
                    const { data, content: markdownContent } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$gray$2d$matter__$5b$external$5d$__$28$gray$2d$matter$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$gray$2d$matter$29$__["default"])(rawMarkdown);
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
                        frontmatter: data,
                        filePath
                    };
                } catch  {
                    return null;
                }
            }
        }
    }
    return null;
}
async function getIntelBriefings(limit = 20, vertical) {
    const briefings = [];
    const files = getMarkdownFiles(PATHS.intelligence);
    for (const filePath of files){
        const filename = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].basename(filePath);
        // Only process intel briefing files
        if (!filename.startsWith('intel_briefing_')) continue;
        try {
            const rawContent = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(filePath, 'utf-8');
            const { data, content } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$gray$2d$matter__$5b$external$5d$__$28$gray$2d$matter$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$gray$2d$matter$29$__["default"])(rawContent);
            // Extract vertical from filename (e.g., intel_briefing_2026-01-21_ARM.md)
            const verticalMatch = filename.match(/intel_briefing_\d{4}-\d{2}-\d{2}_(\w+)\.md/i);
            const briefingVertical = parseVertical(verticalMatch?.[1] || data.vertical);
            if (vertical && briefingVertical !== vertical) continue;
            // Parse alerts from content
            const alerts = [];
            const alertMatches = content.matchAll(/###\s*(.+?)\n\*\s*\*\*Link\*\*:\s*(\S+)\n\*\s*\*\*Date\*\*:\s*(.+)/g);
            for (const match of alertMatches){
                alerts.push({
                    type: 'market',
                    title: match[1].trim(),
                    summary: `Source: ${match[2]}`,
                    source: match[2],
                    urgency: 'medium'
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
                filePath
            });
        } catch  {
        // Skip files that can't be read
        }
    }
    return briefings.sort((a, b)=>b.date.localeCompare(a.date)).slice(0, limit);
}
async function getSystemHealth() {
    const defaultHealth = {
        status: 'GREEN',
        message: 'System operational',
        lastCheck: new Date().toISOString(),
        details: {
            agentsOnline: 22,
            totalAgents: 22,
            publishQueueCount: 0,
            recentErrors: []
        }
    };
    try {
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(PATHS.healthFile)) {
            return defaultHealth;
        }
        const content = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(PATHS.healthFile, 'utf-8');
        // Parse the markdown table for the latest status
        const lines = content.split('\n');
        let lastStatus = 'GREEN';
        let lastMessage = 'System operational';
        let lastDate = new Date().toISOString().split('T')[0];
        for (const line of lines){
            const match = line.match(/\|\s*(\d{4}-\d{2}-\d{2})\s*\|\s*(GREEN|YELLOW|RED)\s*\|\s*(.+?)\s*\|/);
            if (match) {
                lastDate = match[1];
                lastStatus = match[2];
                lastMessage = match[3];
            }
        }
        // Count publish queue items
        let publishQueueCount = 0;
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(PATHS.publishQueue)) {
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
                recentErrors: []
            }
        };
    } catch  {
        return defaultHealth;
    }
}
async function getRecentActions(limit = 10) {
    const actions = [];
    try {
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(PATHS.autopilotLog)) {
            return actions;
        }
        const content = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(PATHS.autopilotLog, 'utf-8');
        const blocks = content.split(/### Run: /);
        for (const block of blocks){
            if (!block.trim()) continue;
            // Extract timestamp
            const timestampMatch = block.match(/^(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})/);
            if (!timestampMatch) continue;
            const timestamp = timestampMatch[1];
            // Extract actions
            const actionLines = block.split('\n').filter((line)=>line.startsWith('*'));
            for (const line of actionLines){
                const verticalMatch = line.match(/\[(\w+)\]/);
                const vertical = verticalMatch ? parseVertical(verticalMatch[1]) : undefined;
                // Determine action type and details
                let action = 'System Activity';
                let details = line.replace(/^\*\s*/, '').replace(/\[.*?\]\s*/, '').trim();
                let status = 'info';
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
                    status
                });
            }
        }
    } catch  {
    // Return empty array on error
    }
    // Sort by timestamp descending and limit
    return actions.sort((a, b)=>b.timestamp.localeCompare(a.timestamp)).slice(0, limit);
}
async function getPublishQueue() {
    const items = [];
    // Check for ready_to_publish directory
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(PATHS.publishQueue)) {
        // Also check for APPROVED items in final_assets
        const assets = await getRecentAssets(100);
        return assets.filter((a)=>a.status === 'APPROVED').map((a)=>({
                id: a.slug,
                path: a.filePath,
                platform: a.contentType === 'LinkedIn' ? 'linkedin' : 'zoho',
                title: a.title,
                vertical: a.vertical,
                contentType: a.contentType
            }));
    }
    const files = getMarkdownFiles(PATHS.publishQueue);
    for (const filePath of files){
        try {
            const content = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(filePath, 'utf-8');
            const { data } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$gray$2d$matter__$5b$external$5d$__$28$gray$2d$matter$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$gray$2d$matter$29$__["default"])(content);
            const filename = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].basename(filePath);
            items.push({
                id: createSlug(filename),
                path: filePath,
                platform: data.platform || (data.content_type === 'LinkedIn' ? 'linkedin' : 'zoho'),
                title: data.title || filename.replace(/\.md$/, ''),
                vertical: parseVertical(data.vertical),
                contentType: parseContentType(data.content_type),
                scheduledFor: data.scheduled_for
            });
        } catch  {
        // Skip files that can't be read
        }
    }
    return items;
}
}),
"[project]/app/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"002464a0ba6387de1e9c3b38203d38bc54111d736d":"refreshIntel","007348100226a0906d1aa37b280acf67b46ebc0029":"getPublishQueueAction","007a704ebc75e4514bf42dd13b1e865f4c04a03647":"refreshDashboard","00f451c079b1733c6880e64da6e0bedeb599f3afe7":"refreshVault","605cb1c2e35f1e4429892c59cdfa7a8d1c12479336":"triggerAutopilot","6069c463e42b4e3a5303093563ccad9a1cd93fc6a6":"createReactionAsset","708bef6abe21fc311dd754f1b8d633e3ca2a152036":"publishAsset"},"",""] */ __turbopack_context__.s([
    "createReactionAsset",
    ()=>createReactionAsset,
    "getPublishQueueAction",
    ()=>getPublishQueueAction,
    "publishAsset",
    ()=>publishAsset,
    "refreshDashboard",
    ()=>refreshDashboard,
    "refreshIntel",
    ()=>refreshIntel,
    "refreshVault",
    ()=>refreshVault,
    "triggerAutopilot",
    ()=>triggerAutopilot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/child_process [external] (child_process, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$file$2d$system$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/file-system.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
// Base path to parent directory
const BASE_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), '..');
async function refreshDashboard() {
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
        return {
            success: true,
            message: 'Dashboard refreshed'
        };
    } catch (error) {
        return {
            success: false,
            error: String(error)
        };
    }
}
async function refreshIntel() {
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/intel');
        return {
            success: true,
            message: 'Intel refreshed'
        };
    } catch (error) {
        return {
            success: false,
            error: String(error)
        };
    }
}
async function refreshVault() {
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/vault');
        return {
            success: true,
            message: 'Vault refreshed'
        };
    } catch (error) {
        return {
            success: false,
            error: String(error)
        };
    }
}
async function triggerAutopilot(verticals, dryRun = false) {
    try {
        const scriptPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(BASE_PATH, 'scripts', 'autopilot_runner.py');
        let command = `python3 "${scriptPath}"`;
        // Add dry-run flag if specified
        if (dryRun) {
            command += ' --dry-run';
        }
        // Add vertical filter if specified
        if (verticals && verticals.length > 0) {
            command += ` --verticals ${verticals.join(',')}`;
        }
        console.log(`[Autopilot] Running: ${command}`);
        // Execute the autopilot script
        const output = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__["execSync"])(command, {
            cwd: BASE_PATH,
            encoding: 'utf-8',
            timeout: 300000,
            stdio: [
                'pipe',
                'pipe',
                'pipe'
            ]
        });
        console.log(`[Autopilot] Output: ${output}`);
        // Revalidate all pages
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/intel');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/vault');
        return {
            success: true,
            message: `Autopilot completed for ${verticals?.join(', ') || 'all verticals'}`,
            data: output
        };
    } catch (error) {
        console.error('[Autopilot] Error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}
async function publishAsset(platform, filePath, dryRun = false) {
    try {
        const scriptPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(BASE_PATH, 'scripts', 'publish_content.py');
        let command = `python3 "${scriptPath}" --platform ${platform} --file "${filePath}"`;
        if (dryRun) {
            command += ' --dry-run';
        }
        console.log(`[Publish] Running: ${command}`);
        // Execute the publish script
        const output = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__["execSync"])(command, {
            cwd: BASE_PATH,
            encoding: 'utf-8',
            timeout: 120000,
            stdio: [
                'pipe',
                'pipe',
                'pipe'
            ]
        });
        console.log(`[Publish] Output: ${output}`);
        // Revalidate relevant pages
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/vault');
        return {
            success: true,
            message: `Published to ${platform}`,
            data: output
        };
    } catch (error) {
        console.error('[Publish] Error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}
async function getPublishQueueAction() {
    try {
        const items = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$file$2d$system$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPublishQueue"])();
        return {
            success: true,
            data: items
        };
    } catch (error) {
        console.error('[PublishQueue] Error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}
async function createReactionAsset(briefingId, vertical) {
    try {
        // This would typically trigger an agent workflow
        // For now, we'll just log the request
        console.log(`[ReactionAsset] Creating for briefing ${briefingId}, vertical ${vertical}`);
        return {
            success: true,
            message: `Reaction asset queued for ${vertical}`
        };
    } catch (error) {
        console.error('[ReactionAsset] Error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    refreshDashboard,
    refreshIntel,
    refreshVault,
    triggerAutopilot,
    publishAsset,
    getPublishQueueAction,
    createReactionAsset
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(refreshDashboard, "007a704ebc75e4514bf42dd13b1e865f4c04a03647", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(refreshIntel, "002464a0ba6387de1e9c3b38203d38bc54111d736d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(refreshVault, "00f451c079b1733c6880e64da6e0bedeb599f3afe7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(triggerAutopilot, "605cb1c2e35f1e4429892c59cdfa7a8d1c12479336", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(publishAsset, "708bef6abe21fc311dd754f1b8d633e3ca2a152036", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPublishQueueAction, "007348100226a0906d1aa37b280acf67b46ebc0029", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createReactionAsset, "6069c463e42b4e3a5303093563ccad9a1cd93fc6a6", null);
}),
"[project]/.next-internal/server/app/intel/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions.ts [app-rsc] (ecmascript)");
;
;
;
}),
"[project]/.next-internal/server/app/intel/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "007348100226a0906d1aa37b280acf67b46ebc0029",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPublishQueueAction"],
    "605cb1c2e35f1e4429892c59cdfa7a8d1c12479336",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["triggerAutopilot"],
    "708bef6abe21fc311dd754f1b8d633e3ca2a152036",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["publishAsset"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$intel$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/intel/page/actions.js { ACTIONS_MODULE0 => "[project]/app/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a161828d._.js.map