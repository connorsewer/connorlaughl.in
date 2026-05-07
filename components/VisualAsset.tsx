type VisualAssetProps = {
  src: string;
  mobileSrc?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  width: number;
  height: number;
  mobileWidth?: number;
  mobileHeight?: number;
};

export function VisualAsset({
  src,
  mobileSrc,
  alt,
  className = "",
  imageClassName = "",
  priority = false,
  width,
  height,
  mobileWidth,
  mobileHeight,
}: VisualAssetProps) {
  const loading = priority ? "eager" : "lazy";
  const decoding = priority ? "sync" : "async";

  return (
    <picture className={`block overflow-hidden ${className}`}>
      {mobileSrc && (
        <source
          media="(max-width: 767px)"
          srcSet={mobileSrc}
          width={mobileWidth}
          height={mobileHeight}
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        className={`h-full w-full object-cover ${imageClassName}`}
      />
    </picture>
  );
}
