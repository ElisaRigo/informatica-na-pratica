import { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  priority = false,
  className,
  ...props 
}: OptimizedImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      {...(priority && { fetchpriority: 'high' as any })}
      {...props}
    />
  );
};
