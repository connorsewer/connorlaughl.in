"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { CaseStudy } from "@/content/case-studies";

export function ProofExplorer({ items }: { items: CaseStudy[] }) {
  const [hovered, setHovered] = useState<string | null>(items[0].slug);

  const activeItem = items.find(i => i.slug === hovered) || items[0];

  return (
    <div className="grid lg:grid-cols-[400px_1fr] gap-12 min-h-[600px]">
      {/* Left List */}
      <div className="flex flex-col border-r border-rule pr-8">
        <div className="font-mono text-[10px] tracking-[0.3em] text-accent mb-8 uppercase">Index</div>
        <div className="flex flex-col">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/case-studies/${item.slug}`}
              onMouseEnter={() => setHovered(item.slug)}
              onFocus={() => setHovered(item.slug)}
              onTouchStart={() => setHovered(item.slug)}
              className="group py-4 border-b border-rule/50 flex items-baseline gap-x-6 transition-colors hover:text-accent focus-visible:text-accent"
            >
              <span className={`font-display text-xl md:text-2xl leading-tight flex-1 min-w-0 transition-transform duration-300 ${hovered === item.slug ? 'translate-x-2' : ''}`}>
                {item.title}
              </span>
              <span className="font-mono text-[9px] opacity-40 group-hover:opacity-100 uppercase tracking-widest shrink-0 whitespace-nowrap text-right">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Right Preview */}
      <div className="relative pt-12 lg:pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="sticky top-32"
          >
            <div className="font-mono text-[10px] tracking-[0.3em] text-accent mb-4 uppercase">Brief</div>
            <h3 className="font-display text-4xl mb-6 text-balance">{activeItem.title}</h3>
            <p className="text-paper/60 text-lg leading-relaxed mb-8 max-w-xl">
              {activeItem.deck}
            </p>

            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <div className="font-mono text-[9px] tracking-[0.2em] text-paper/40 uppercase mb-2">What it produced</div>
                <div className="text-sm border-l border-accent/30 pl-4">{activeItem.outcome}</div>
              </div>
              <div>
                <div className="font-mono text-[9px] tracking-[0.2em] text-paper/40 uppercase mb-2">Stack</div>
                <div className="text-sm border-l border-accent/30 pl-4">{activeItem.stack}</div>
              </div>
            </div>

            <Link
              href={`/case-studies/${activeItem.slug}`}
              className="inline-flex items-center gap-4 group"
            >
              <span className="cta-scan font-mono text-[10px] tracking-[0.2em] uppercase border border-paper/20 px-6 py-3 rounded-full group-hover:bg-paper group-hover:text-ink transition-colors">
                Open the file
              </span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
