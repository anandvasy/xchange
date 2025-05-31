import mongoose from 'mongoose';
import { CommunityVisibility } from '@college-community/core';

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  visibility: {
    type: String,
    enum: Object.values(CommunityVisibility),
    default: CommunityVisibility.PUBLIC,
  },
  coverImage: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  memberCount: {
    type: Number,
    default: 1,
  },
  tags: [{
    type: String,
  }],
}, {
  timestamps: true,
});

// Index for search
communitySchema.index({ name: 'text', description: 'text', tags: 'text' });

// Middleware to populate creator
communitySchema.pre(/^find/, function(this: mongoose.Query<any, any>, next) {
  this.populate('createdBy', 'firstName lastName email profilePicture');
  next();
});

export const Community = mongoose.model('Community', communitySchema); 