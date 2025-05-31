import { Router } from 'express';
import { z } from 'zod';
import { CommunityModel } from '../models/community.model';
import { authenticateToken } from '../middleware/auth';

const router = Router();

const createCommunitySchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  image: z.string().optional(),
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description, image } = createCommunitySchema.parse(req.body);
    
    const existingCommunity = await CommunityModel.findOne({ name });
    if (existingCommunity) {
      return res.status(400).json({ message: 'Community already exists' });
    }

    const community = await CommunityModel.create({
      name,
      description,
      image,
      members: [req.user._id],
      createdBy: req.user._id,
    });

    res.status(201).json(community);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const communities = await CommunityModel.find()
      .populate('createdBy', 'name')
      .select('-members');
    res.json(communities);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const community = await CommunityModel.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('members', 'name');
    
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }
    
    res.json(community);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/join', authenticateToken, async (req, res) => {
  try {
    const community = await CommunityModel.findById(req.params.id);
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    if (community.members.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already a member' });
    }

    community.members.push(req.user._id);
    await community.save();

    res.json({ message: 'Joined community successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/leave', authenticateToken, async (req, res) => {
  try {
    const community = await CommunityModel.findById(req.params.id);
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    if (!community.members.includes(req.user._id)) {
      return res.status(400).json({ message: 'Not a member' });
    }

    community.members = community.members.filter(
      (memberId) => memberId.toString() !== req.user._id
    );
    await community.save();

    res.json({ message: 'Left community successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export const communityRouter = router; 