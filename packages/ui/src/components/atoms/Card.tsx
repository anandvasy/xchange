import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      padding = 'md',
      shadow = 'sm',
      border = true,
      hover = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-lg bg-white';
    
    const paddingStyles = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };

    const shadowStyles = {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow',
      lg: 'shadow-lg',
    };

    const styles = twMerge(
      baseStyles,
      paddingStyles[padding],
      shadowStyles[shadow],
      border && 'border border-gray-200',
      hover && 'transition-shadow duration-200 hover:shadow-md',
      className
    );

    return (
      <div ref={ref} className={styles} {...props}>
        {children}
      </div>
    );
  }
); 