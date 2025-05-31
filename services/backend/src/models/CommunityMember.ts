import mongoose from 'mongoose';
import { CommunityRole } from '@college-community/core';

const communityMemberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community',
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(CommunityRole),
    default: CommunityRole.MEMBER,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index to ensure unique membership
communityMemberSchema.index({ userId: 1, communityId: 1 }, { unique: true });

// Middleware to populate user and community
communityMemberSchema.pre(/^find/, function(this: mongoose.Query<any, any>, next) {
  this.populate('userId', 'firstName lastName email profilePicture')
      .populate('communityId', 'name description visibility');
  next();
});

export const CommunityMember = mongoose.model('CommunityMember', communityMemberSchema); 