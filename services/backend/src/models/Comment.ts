import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
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
  likeCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Indexes for efficient querying
commentSchema.index({ postId: 1, createdAt: -1 });
commentSchema.index({ author: 1, createdAt: -1 });

// Middleware to populate author
commentSchema.pre(/^find/, function(this: mongoose.Query<any, any>, next) {
  this.populate('author', 'firstName lastName email profilePicture');
  next();
});

// Update post's comment count on comment creation
commentSchema.post('save', async function(doc) {
  await mongoose.model('Post').updateOne(
    { _id: doc.postId },
    { $inc: { commentCount: 1 } }
  );
});

// Update post's comment count on comment deletion
commentSchema.post('deleteOne', async function(doc) {
  if (doc) {
    await mongoose.model('Post').updateOne(
      { _id: doc.postId },
      { $inc: { commentCount: -1 } }
    );
  }
});

export const Comment = mongoose.model('Comment', commentSchema); 