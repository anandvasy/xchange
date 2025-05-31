import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
}

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, size = 'md', src, alt, fallback, onError, ...props }, ref) => {
    const [error, setError] = React.useState(false);

    const sizes = {
      xs: 'h-6 w-6',
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-14 w-14',
    };

    const baseStyles = 'rounded-full object-cover';
    const styles = twMerge(baseStyles, sizes[size], className);

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setError(true);
      onError?.(e);
    };

    if (error || !src) {
      const initials = fallback
        ? fallback
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
        : '?';

      return (
        <div
          className={twMerge(
            'inline-flex items-center justify-center bg-gray-200 text-gray-600',
            styles
          )}
          {...props}
        >
          <span className="text-sm font-medium">{initials}</span>
        </div>
      );
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={styles}
        onError={handleError}
        {...props}
      />
    );
  }
); 