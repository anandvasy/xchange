import { z } from 'zod';

// User role enum
export enum UserRole {
  STUDENT = 'STUDENT',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
}

// Base user schema
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.nativeEnum(UserRole),
  collegeId: z.string(),
  profilePicture: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Login credentials schema
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Registration schema
export const registrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string(),
  lastName: z.string(),
  collegeId: z.string(),
});

// Auth response schema
export const authResponseSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});

// Types
export type User = z.infer<typeof userSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegistrationData = z.infer<typeof registrationSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>; 