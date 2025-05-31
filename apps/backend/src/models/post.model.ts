import mongoose from 'mongoose';
import { Post } from '@xchange/shared-types';

const postSchema = new mongoose.Schema<Post>(
  {
    content: {
      type: String,
      required: true,
    },
    images: [String],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Community',
      required: true,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    dislikes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    comments: [{
      content: {
        type: String,
        required: true,
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }],
      dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }],
      createdAt: Date,
      updatedAt: Date,
    }],
  },
  { timestamps: true }
);

export const PostModel = mongoose.model<Post>('Post', postSchema); 