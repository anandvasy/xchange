import { z } from 'zod';
import { postSchema, commentSchema } from './community';
import { userSchema } from './auth';

// Event types enum
export enum EventType {
  // Post events
  POST_CREATED = 'POST_CREATED',
  POST_UPDATED = 'POST_UPDATED',
  POST_DELETED = 'POST_DELETED',
  
  // Comment events
  COMMENT_CREATED = 'COMMENT_CREATED',
  COMMENT_UPDATED = 'COMMENT_UPDATED',
  COMMENT_DELETED = 'COMMENT_DELETED',
  
  // Like events
  POST_LIKED = 'POST_LIKED',
  COMMENT_LIKED = 'COMMENT_LIKED',
  
  // Community events
  MEMBER_JOINED = 'MEMBER_JOINED',
  MEMBER_LEFT = 'MEMBER_LEFT',
  MEMBER_ROLE_UPDATED = 'MEMBER_ROLE_UPDATED',
  
  // User events
  USER_ONLINE = 'USER_ONLINE',
  USER_OFFLINE = 'USER_OFFLINE',
  
  // Notification events
  NOTIFICATION_CREATED = 'NOTIFICATION_CREATED',
}

// Base event schema
export const baseEventSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(EventType),
  timestamp: z.date(),
});

// Post event schema
export const postEventSchema = baseEventSchema.extend({
  type: z.enum([
    EventType.POST_CREATED,
    EventType.POST_UPDATED,
    EventType.POST_DELETED,
  ]),
  data: postSchema,
});

// Comment event schema
export const commentEventSchema = baseEventSchema.extend({
  type: z.enum([
    EventType.COMMENT_CREATED,
    EventType.COMMENT_UPDATED,
    EventType.COMMENT_DELETED,
  ]),
  data: commentSchema,
});

// Like event schema
export const likeEventSchema = baseEventSchema.extend({
  type: z.enum([EventType.POST_LIKED, EventType.COMMENT_LIKED]),
  data: z.object({
    userId: z.string(),
    targetId: z.string(), // postId or commentId
  }),
});

// Member event schema
export const memberEventSchema = baseEventSchema.extend({
  type: z.enum([
    EventType.MEMBER_JOINED,
    EventType.MEMBER_LEFT,
    EventType.MEMBER_ROLE_UPDATED,
  ]),
  data: z.object({
    communityId: z.string(),
    user: userSchema,
    role: z.string().optional(),
  }),
});

// User presence event schema
export const presenceEventSchema = baseEventSchema.extend({
  type: z.enum([EventType.USER_ONLINE, EventType.USER_OFFLINE]),
  data: z.object({
    userId: z.string(),
    lastSeen: z.date(),
  }),
});

// Notification event schema
export const notificationEventSchema = baseEventSchema.extend({
  type: z.literal(EventType.NOTIFICATION_CREATED),
  data: z.object({
    userId: z.string(),
    title: z.string(),
    message: z.string(),
    link: z.string().optional(),
  }),
});

// Union of all event types
export const eventSchema = z.discriminatedUnion('type', [
  postEventSchema,
  commentEventSchema,
  likeEventSchema,
  memberEventSchema,
  presenceEventSchema,
  notificationEventSchema,
]);

// Types
export type Event = z.infer<typeof eventSchema>;
export type PostEvent = z.infer<typeof postEventSchema>;
export type CommentEvent = z.infer<typeof commentEventSchema>;
export type LikeEvent = z.infer<typeof likeEventSchema>;
export type MemberEvent = z.infer<typeof memberEventSchema>;
export type PresenceEvent = z.infer<typeof presenceEventSchema>;
export type NotificationEvent = z.infer<typeof notificationEventSchema>; 