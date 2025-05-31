import mongoose from 'mongoose';
import { Community } from '@xchange/shared-types';

const communitySchema = new mongoose.Schema<Community>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: String,
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const CommunityModel = mongoose.model<Community>('Community', communitySchema); 