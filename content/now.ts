/**
 * The /now status board (re-story port, bank A8 decision D3).
 *
 * Every string is Connor's own copy, ported verbatim from the previous
 * site's "Currently" block. Edit freely and bump `nowUpdated`; the page
 * renders the stamp so a stale board is at least honest about its age.
 * No gated numeral belongs here; anything that reads as a business claim
 * goes through content/proof-metrics.ts instead.
 */

export const nowUpdated = "2026-08-06";

export const nowLede =
  "What's open on the desk, what's been on the screen, what I'm playing, and what I'm building when nobody's billing for it.";

export type NowBook = { title: string; subtitle?: string; author: string };

export const nowReading: NowBook[] = [
  { title: "The Bright Sword", author: "Lev Grossman" },
  { title: "The Devil's Chessboard", author: "David Talbot" },
  {
    title: "The Art of Doing Science and Engineering",
    subtitle: "Learning to Learn",
    author: "Richard W. Hamming",
  },
  { title: "The Faith of Beasts", author: "James S.A. Corey" },
  { title: "Welcome to the Era of Experience", author: "Silver & Sutton" },
  { title: "Hyperion Cantos", author: "Dan Simmons" },
  { title: "Vineland", author: "Thomas Pynchon" },
];

export const nowFilms = [
  "The Nice Guys (2016)",
  "Sorcerer (1975)",
  "Thief (1981)",
  "Barry Lyndon (1975)",
  "Man on Fire (2004)",
  "Michael Clayton (2007)",
];

export const nowTv = [
  "Widow's Bay",
  "Andor, Seasons 1 and 2",
  "The Sopranos, Season 4",
  "The Expanse, Season 2",
  "Summer House, Season 10",
];

export const nowPlaying = {
  titles: ["Marathon", "Diablo IV"],
  note: "Marathon for the slow-burn extraction sessions. Diablo IV for the loop.",
};

export const nowBuilding = [
  "A handful of projects in Claude Code.",
  "Recruiter OS for my brother Ryan, who runs in executive search.",
  "Poking around at Hermes Agent.",
  "Furniture Kristin orders that shows up unannounced.",
  "Lego sets with my nephew George (age 5).",
];
