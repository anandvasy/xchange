export interface User {
  _id: string;
  email: string;
  name: string;
  profilePicture?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Community {
  _id: string;
  name: string;
  description: string;
  image?: string;
  members: string[]; // User IDs
  createdBy: string; // User ID
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  _id: string;
  content: string;
  images?: string[];
  author: string; // User ID
  community: string; // Community ID
  likes: string[]; // User IDs
  dislikes: string[]; // User IDs
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  _id: string;
  content: string;
  author: string; // User ID
  post: string; // Post ID
  likes: string[]; // User IDs
  dislikes: string[]; // User IDs
  createdAt: Date;
  updatedAt: Date;
} 