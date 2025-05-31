import { Router } from 'express';
import { z } from 'zod';
import { PostModel } from '../models/post.model';
import { authenticateToken } from '../middleware/auth';

const router = Router();

const createPostSchema = z.object({
  content: z.string().min(1),
  images: z.array(z.string()).optional(),
  communityId: z.string(),
});

const createCommentSchema = z.object({
  content: z.string().min(1),
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { content, images, communityId } = createPostSchema.parse(req.body);
    
    const post = await PostModel.create({
      content,
      images,
      author: req.user._id,
      community: communityId,
      likes: [],
      dislikes: [],
      comments: [],
    });

    await post.populate('author', 'name');
    res.status(201).json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/community/:communityId', async (req, res) => {
  try {
    const posts = await PostModel.find({ community: req.params.communityId })
      .populate('author', 'name')
      .populate('comments.author', 'name')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userId = req.user._id;
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
      post.dislikes = post.dislikes.filter((id) => id.toString() !== userId);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/dislike', authenticateToken, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userId = req.user._id;
    if (post.dislikes.includes(userId)) {
      post.dislikes = post.dislikes.filter((id) => id.toString() !== userId);
    } else {
      post.dislikes.push(userId);
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/comments', authenticateToken, async (req, res) => {
  try {
    const { content } = createCommentSchema.parse(req.body);
    
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({
      content,
      author: req.user._id,
      likes: [],
      dislikes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await post.save();
    await post.populate('comments.author', 'name');
    res.json(post.comments[post.comments.length - 1]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

export const postRouter = router; 