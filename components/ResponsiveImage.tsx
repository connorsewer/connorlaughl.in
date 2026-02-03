"use client";

import { useState } from "react";
import manifest from "@/image-manifest.json";

interface ResponsiveImageProps {
  /** Image key from manifest (e.g., "salesforce-32k-prospects") */
  imageKey: string;
  /** Whether this image is above the fold (eager loading) */
  priority?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Optional caption override */
  caption?: string;
  /** Whether to show caption visually */
  showCaption?: boolean;
  /** Aspect ratio override (e.g., "16/9", "4/3") */
  aspectRatio?: string;
}

interface ImageSize {
  width: number;
  height: number;
  webp: {
    filename: string;
    size_kb: number;
    quality: number;
  };
  jpeg: {
    filename: string;
    size_kb: number;
    quality: number;
  };
}

interface ImageManifest {
  generated_at: string;
  target_max_kb: number;
  sizes_config: Record<string, number>;
  images: Array<{
    key: string;
    alt: string;
    caption: string;
    category: string;
    priority: number;
    sizes: Record<string, ImageSize>;
    srcset: {
      webp: string;
      jpeg: string;
    };
  }>;
}

const typedManifest = manifest as ImageManifest;

/**
 * ResponsiveImage Component
 * 
 * Optimized image component with:
 * - WebP format with JPEG fallback
 * - Responsive srcset for all breakpoints
 * - Lazy loading for below-fold images
 * - Proper aspect ratio to prevent CLS
 * - Descriptive alt text from manifest
 * 
 * @example
 * <ResponsiveImage 
 *   imageKey="salesforce-32k-prospects"
 *   priority={true}
 *   className="rounded-lg shadow-lg"
 * />
 */
export function ResponsiveImage({
  imageKey,
  priority = false,
  className = "",
  caption,
  showCaption = false,
  aspectRatio,
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const image = typedManifest.images.find((img) => img.key === imageKey);
  
  if (!image) {
    console.warn(`Image not found in manifest: ${imageKey}`);
    return null;
  }

  const fullSize = image.sizes.full;
  const displayCaption = caption || image.caption;
  
  // Calculate aspect ratio from image dimensions
  const intrinsicRatio = aspectRatio || `${fullSize.width}/${fullSize.height}`;
  
  return (
    <figure className={`m-0 ${className}`}>
      <div 
        className="relative overflow-hidden bg-ink/20"
        style={{ aspectRatio: intrinsicRatio }}
      >
        {/* Skeleton loader */}
        {!isLoaded && (
          <div className="absolute inset-0 animate-pulse bg-paper/10" 
               aria-hidden="true" />
        )}
        
        <picture>
          {/* WebP source */}
          <source
            type="image/webp"
            srcSet={image.srcset.webp}
            sizes="(max-width: 640px) 640px, (max-width: 1080px) 1080px, 1920px"
          />
          
          {/* JPEG fallback */}
          <img
            src={`/portfolio-assets/optimized/${fullSize.jpeg.filename}`}
            srcSet={image.srcset.jpeg}
            sizes="(max-width: 640px) 640px, (max-width: 1080px) 1080px, 1920px"
            alt={image.alt}
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
            width={fullSize.width}
            height={fullSize.height}
            onLoad={() => setIsLoaded(true)}
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-300
              ${isLoaded ? "opacity-100" : "opacity-0"}
            `}
          />
        </picture>
      </div>
      
      {/* Caption */}
      {displayCaption && (
        <figcaption 
          className={`
            mt-3 text-sm text-paper/60 leading-relaxed
            ${showCaption ? "block" : "sr-only"}
          `}
        >
          {displayCaption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * ImageGallery Component
 * 
 * Grid layout for multiple proof images with consistent sizing.
 */
interface ImageGalleryProps {
  imageKeys: string[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function ImageGallery({
  imageKeys,
  columns = 2,
  className = "",
}: ImageGalleryProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 ${className}`}>
      {imageKeys.map((key, index) => (
        <ResponsiveImage
          key={key}
          imageKey={key}
          priority={index < 2} // First 2 images load eagerly
          showCaption={true}
        />
      ))}
    </div>
  );
}

/**
 * HeroImage Component
 * 
 * Full-width hero image with overlay support.
 */
interface HeroImageProps {
  imageKey: string;
  overlay?: boolean;
  overlayOpacity?: number;
  children?: React.ReactNode;
  className?: string;
}

export function HeroImage({
  imageKey,
  overlay = false,
  overlayOpacity = 0.4,
  children,
  className = "",
}: HeroImageProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <ResponsiveImage
        imageKey={imageKey}
        priority={true}
        className="absolute inset-0 w-full h-full"
      />
      
      {overlay && (
        <div 
          className="absolute inset-0 bg-ink pointer-events-none"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      )}
      
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}

export default ResponsiveImage;
