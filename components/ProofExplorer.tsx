"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { CaseStudy } from "@/content/case-studies";

export function ProofExplorer({ items }: { items: CaseStudy[] }) {
  const [hovered, setHovered] = useState<string | null>(items[0].slug);

  const activeItem = items.find(i => i.slug === hovered) || items[0];

  return (
    <div className="grid gap-10 lg:min-h-[600px] lg:grid-cols-[400px_1fr] lg:gap-12">
      {/* Left List */}
      <div className="flex flex-col border-b border-rule pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
        <div className="meta-label-accent mb-8">Case studies</div>
        <div className="flex flex-col">
          {items.map((item) => (
            <Link 
              key={item.slug}
              href={`/case-studies/${item.slug}`}
              onMouseEnter={() => setHovered(item.slug)}
              className="group flex flex-col gap-2 border-b border-rule/50 py-4 transition-colors hover:text-accent sm:flex-row sm:items-baseline sm:justify-between"
            >
              <span className={`font-display text-2xl transition-transform duration-300 ${hovered === item.slug ? 'translate-x-2' : ''}`}>
                {item.title}
              </span>
              <span className="meta-label-subtle opacity-75 group-hover:opacity-100">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Right Preview */}
      <div className="relative lg:pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="sticky top-32"
          >
            <div className="meta-label-accent mb-4">What happened</div>
            <h3 className="font-display text-4xl mb-6 text-balance">{activeItem.title}</h3>
            <p className="text-paper/72 text-lg leading-relaxed mb-8 max-w-xl">
              {activeItem.businessProblem}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <div className="meta-label-muted mb-2">What I built</div>
                <div className="text-sm border-l border-accent/30 pl-4">{activeItem.whatIBuilt}</div>
              </div>
              <div>
                <div className="meta-label-muted mb-2">What changed</div>
                <div className="text-sm border-l border-accent/30 pl-4">{activeItem.whatChanged}</div>
              </div>
            </div>

            <Link 
              href={`/case-studies/${activeItem.slug}`}
              className="inline-flex items-center gap-4 group"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase border border-paper/20 px-6 py-3 rounded-full group-hover:bg-paper group-hover:text-ink transition-all">
                Read case study
              </span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
