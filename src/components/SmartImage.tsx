"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type SmartImageProps = Omit<ImageProps, "onError"> & {
  /** Background shown while the real image is missing */
  fallbackClassName?: string;
};

/**
 * next/image that degrades to a soft colour block if the file isn't in
 * /public/images yet, so the layout never breaks during development.
 */
export default function SmartImage({ fallbackClassName = "bg-cream-dark", alt, className = "", ...props }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex h-full w-full items-center justify-center p-3 text-center text-xs font-semibold opacity-80 ${fallbackClassName} ${className}`}
      >
        {alt}
      </div>
    );
  }

  return <Image alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}
