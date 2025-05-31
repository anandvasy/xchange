import React from 'react';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import { UsersIcon } from '@heroicons/react/24/outline';

export interface CommunityCardProps {
  name: string;
  description: string;
  memberCount: number;
  coverImage?: string;
  onClick?: () => void;
  onJoin?: () => void;
  isMember?: boolean;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({
  name,
  description,
  memberCount,
  coverImage,
  onClick,
  onJoin,
  isMember = false,
}) => {
  return (
    <Card
      className="overflow-hidden hover:cursor-pointer"
      padding="none"
      onClick={onClick}
    >
      {coverImage && (
        <div className="h-32 w-full">
          <img
            src={coverImage}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <UsersIcon className="h-4 w-4" />
            <span>{memberCount} members</span>
          </div>

          <Button
            variant={isMember ? 'outline' : 'primary'}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onJoin?.();
            }}
          >
            {isMember ? 'Joined' : 'Join'}
          </Button>
        </div>
      </div>
    </Card>
  );
}; 