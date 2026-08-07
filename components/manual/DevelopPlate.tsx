"use client";

import Image from "next/image";
import { useState } from "react";

import type { PhotoPlate } from "@/content/plates";

/**
 * A photographic plate that develops (bank A8, decision D5).
 *
 * At rest the photo is screened to the blueprint duotone with a CSS filter,
 * so it sits in the same ink as the drawn figures. Hovering previews the
 * developed print; clicking or pressing toggles it, like a print coming up
 * in the tray, and the state is announced through `aria-pressed`. Under
 * reduced motion the develop is instant: the outcome is identical and only
 * the transition is lost. The filter is presentation only, so a reader with
 * CSS off simply gets the photograph.
 */

const DUOTONE =
  "[filter:grayscale(1)_sepia(0.35)_hue-rotate(190deg)_saturate(2.1)_contrast(1.05)]";

export function DevelopPlate({ plate }: { plate: PhotoPlate }) {
  const [developed, setDeveloped] = useState(false);

  return (
    <figure className="mb-8 break-inside-avoid">
      <button
        type="button"
        aria-pressed={developed}
        aria-label={`${plate.caption}. Press to develop the plate to full color.`}
        onClick={() => setDeveloped((current) => !current)}
        className="group block w-full cursor-pointer border border-blueprint/40 p-2 text-left"
      >
        <Image
          src={plate.src}
          alt={plate.alt}
          width={plate.width}
          height={plate.height}
          sizes="(min-width: 640px) 24rem, 100vw"
          className={`block h-auto w-full transition-[filter] duration-500 motion-reduce:transition-none group-hover:[filter:none] ${
            developed ? "" : DUOTONE
          }`}
        />
      </button>
      <figcaption className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-blueprint">
          PLATE_{plate.num}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-label-muted">
          {plate.caption}
        </span>
      </figcaption>
    </figure>
  );
}
