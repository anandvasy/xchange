import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Input } from '../atoms/Input';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onSearch, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSearch?.((e.target as HTMLInputElement).value);
      }
    };

    return (
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          ref={ref}
          className="pl-10"
          type="search"
          onKeyDown={handleKeyDown}
          {...props}
        />
      </div>
    );
  }
); 