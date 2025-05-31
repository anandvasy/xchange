import mongoose from 'mongoose';
import { User } from '@xchange/shared-types';

const userSchema = new mongoose.Schema<User & { password: string }>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+@.+\..+/,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    profilePicture: String,
    bio: String,
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<User & { password: string }>('User', userSchema); 