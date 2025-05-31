import { z } from 'zod';
import { userSchema } from './auth';

// Community visibility enum
export enum CommunityVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  RESTRICTED = 'RESTRICTED',
}

// Community role enum
export enum CommunityRole {
  MEMBER = 'MEMBER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
}

// Community schema
export const communitySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  visibility: z.nativeEnum(CommunityVisibility),
  coverImage: z.string().optional(),
  createdBy: userSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  memberCount: z.number(),
  tags: z.array(z.string()),
});

// Community member schema
export const communityMemberSchema = z.object({
  userId: z.string(),
  communityId: z.string(),
  role: z.nativeEnum(CommunityRole),
  joinedAt: z.date(),
});

// Post schema
export const postSchema = z.object({
  id: z.string(),
  communityId: z.string(),
  author: userSchema,
  content: z.string(),
  attachments: z.array(z.string()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  likeCount: z.number(),
  commentCount: z.number(),
});

// Comment schema
export const commentSchema = z.object({
  id: z.string(),
  postId: z.string(),
  author: userSchema,
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  likeCount: z.number(),
});

// Types
export type Community = z.infer<typeof communitySchema>;
export type CommunityMember = z.infer<typeof communityMemberSchema>;
export type Post = z.infer<typeof postSchema>;
export type Comment = z.infer<typeof commentSchema>; 