import { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  width?: number;
  height?: number;
  srcSet?: string;
  sizes?: string;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  priority = false,
  width,
  height,
  srcSet,
  sizes,
  className,
  ...props 
}: OptimizedImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      srcSet={srcSet}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      {...(priority && { fetchpriority: 'high' as any })}
      {...props}
    />
  );
};
