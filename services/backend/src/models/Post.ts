import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community',
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  attachments: [{
    type: String,
  }],
  likeCount: {
    type: Number,
    default: 0,
  },
  commentCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Indexes for efficient querying
postSchema.index({ communityId: 1, createdAt: -1 });
postSchema.index({ author: 1, createdAt: -1 });

// Full-text search index
postSchema.index({ content: 'text' });

// Middleware to populate author and community
postSchema.pre(/^find/, function(this: mongoose.Query<any, any>, next) {
  this.populate('author', 'firstName lastName email profilePicture')
      .populate('communityId', 'name visibility');
  next();
});

export const Post = mongoose.model('Post', postSchema); 