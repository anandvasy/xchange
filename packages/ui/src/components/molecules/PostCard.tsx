import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Card } from '../atoms/Card';
import { Avatar } from '../atoms/Avatar';
import { ChatBubbleLeftIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';

export interface PostCardProps {
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: Date;
  likeCount: number;
  commentCount: number;
  onLike?: () => void;
  onComment?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  author,
  content,
  timestamp,
  likeCount,
  commentCount,
  onLike,
  onComment,
}) => {
  return (
    <Card className="space-y-4">
      <div className="flex items-center space-x-3">
        <Avatar
          src={author.avatar}
          alt={author.name}
          fallback={author.name}
          size="md"
        />
        <div>
          <h3 className="text-sm font-medium text-gray-900">{author.name}</h3>
          <p className="text-xs text-gray-500">
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-700">{content}</p>

      <div className="flex items-center space-x-4 border-t pt-4">
        <button
          onClick={onLike}
          className="flex items-center space-x-1.5 text-sm text-gray-500 hover:text-blue-600"
        >
          <HandThumbUpIcon className="h-5 w-5" />
          <span>{likeCount}</span>
        </button>

        <button
          onClick={onComment}
          className="flex items-center space-x-1.5 text-sm text-gray-500 hover:text-blue-600"
        >
          <ChatBubbleLeftIcon className="h-5 w-5" />
          <span>{commentCount}</span>
        </button>
      </div>
    </Card>
  );
}; 