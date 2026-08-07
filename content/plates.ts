/**
 * The photographic plate series (re-story port, bank A8 decision D5).
 *
 * Eleven photographs from the previous site, unchanged on disk, rendered
 * through the blueprint duotone screen so they sit beside the drawn figures,
 * and developing to full color on press. Captions and alt text are the
 * previous site's, verbatim. The PLATE_NN numbering is its own series,
 * registered in FIGURES.md, and never collides with FIG numbers. Unlike FIG
 * captions, plate captions keep their year marks: a photograph is a dated
 * artifact and its date is part of the record.
 */

export type PhotoPlate = {
  /** PLATE_NN, assigned in the previous site's display order. */
  num: string;
  src: string;
  width: number;
  height: number;
  caption: string;
  alt: string;
};

export const photoPlates: PhotoPlate[] = [
  {
    num: "01",
    src: "/about/wedding-toast.webp",
    width: 1400,
    height: 1750,
    caption: "Toast · Reception · 2025",
    alt: "Connor giving a toast at the wedding reception, rendered in stippled black-and-white.",
  },
  {
    num: "02",
    src: "/about/anfield.webp",
    width: 1400,
    height: 1750,
    caption: "Anfield · You'll Never Walk Alone · 2019",
    alt: "Connor at the Shankly Gates of Anfield, wearing a Liverpool FC scarf.",
  },
  {
    num: "03",
    src: "/about/dog-asleep.webp",
    width: 1400,
    height: 2488,
    caption: "Lulu · 8 weeks old",
    alt: "Lulu, the youngest dog at 8 weeks, asleep on a herringbone blanket in the back of the car.",
  },
  {
    num: "04",
    src: "/about/family-rome.webp",
    width: 1400,
    height: 1750,
    caption: "With godson Lenox · Rome · Sundown",
    alt: "Connor and Kristin laughing with their young godson Lenox in Rome at sunset.",
  },
  {
    num: "05",
    src: "/about/colosseum.webp",
    width: 1400,
    height: 788,
    caption: "Colosseum at dusk · Rome",
    alt: "The Colosseum at dusk through cypress trees in Rome.",
  },
  {
    num: "06",
    src: "/about/wedding-courtyard.webp",
    width: 1400,
    height: 1750,
    caption: "Wedding rehearsal · Vatican City · 2025",
    alt: "Connor and Kristin in formal dress under a wrought-iron lamp post in a Roman courtyard.",
  },
  {
    num: "07",
    src: "/about/music-box.webp",
    width: 1400,
    height: 2488,
    caption: "Music Box Theater · OBAA 70mm · Opening Night",
    alt: "The neon Music Box theatre marquee in Chicago at night, advertising One Battle After Another in 70mm.",
  },
  {
    num: "08",
    src: "/about/castel-bride.webp",
    width: 1400,
    height: 934,
    caption: "Castel Sant'Angelo · Rome · 2025",
    alt: "Bride and groom standing near Castel Sant'Angelo in Rome with a vintage car blurring past.",
  },
  {
    num: "09",
    src: "/about/car-sandwiches.webp",
    width: 1400,
    height: 1750,
    caption: "Road trip lunch · Two halves",
    alt: "Connor and Kristin eating sandwiches in the front seat of the car on a road trip.",
  },
  {
    num: "10",
    src: "/about/phone-booth.webp",
    width: 1400,
    height: 1750,
    caption: "Phone booth · Florence",
    alt: "Connor leaning on a sticker-covered phone booth in Florence on a sunny afternoon.",
  },
  {
    num: "11",
    src: "/about/tweeds.webp",
    width: 1400,
    height: 1750,
    caption: "Tweeds · Detail · Savile Row",
    alt: "A close-up of tweed and herringbone jackets hanging in a Savile Row shop.",
  },
];
