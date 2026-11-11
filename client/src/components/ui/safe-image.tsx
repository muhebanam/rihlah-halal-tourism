"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "src"> {
  src?: string | null;
  fallbackSrc?: string;
}

export function SafeImage({
  src,
  fallbackSrc = "/images/banner.jpg",
  alt,
  ...props
}: SafeImageProps) {
  const getInitialSrc = (url?: string | null) => {
    if (!url || typeof url !== "string") return fallbackSrc;
    const trimmed = url.trim();
    if (!trimmed) return fallbackSrc;
    if (trimmed.startsWith("/") || /^https?:\/\//i.test(trimmed)) {
      return trimmed;
    }
    return fallbackSrc;
  };

  const [imgSrc, setImgSrc] = useState<string>(() => getInitialSrc(src));

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || "Destination preview"}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}
