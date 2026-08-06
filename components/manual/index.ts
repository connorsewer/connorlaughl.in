/**
 * Manual chrome. Global furniture shared by the cover and every chapter.
 * Chapter-specific composition (ChapterLayout, SidebarTOC, Breadcrumb,
 * ChapterMeta) lands in Task 11 and re-exports from here.
 */

export { Masthead, type MastheadProps } from "@/components/manual/Masthead";
export { Breadcrumb, type BreadcrumbProps } from "@/components/manual/Breadcrumb";
export { Sheet, type SheetProps } from "@/components/manual/Sheet";
export { CheckerBand, type CheckerBandProps } from "@/components/manual/CheckerBand";
export { RulerRail } from "@/components/manual/RulerRail";
export { StatTable, type StatRow, type StatTableProps } from "@/components/manual/StatTable";
export {
  ColophonFooter,
  type ColophonFooterProps,
} from "@/components/manual/ColophonFooter";
export {
  CoverTOC,
  type CoverTOCProps,
  type CoverTocGroup,
  type CoverTocLink,
} from "@/components/manual/CoverTOC";
export {
  TerminalFAQ,
  type TerminalFAQProps,
  type TerminalFAQEntry,
} from "@/components/manual/TerminalFAQ";

/* Chapter chrome. */
export {
  ChapterLayout,
  type ChapterLayoutProps,
} from "@/components/manual/ChapterLayout";
export {
  SidebarTOC,
  type SidebarTOCProps,
  type TocEntry,
  type TocSection,
} from "@/components/manual/SidebarTOC";
export { ChapterMeta, type ChapterMetaProps } from "@/components/manual/ChapterMeta";
