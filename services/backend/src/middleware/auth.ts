import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { UserRole } from '@college-community/core';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Environment variables validation
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET must be defined');
}

// Verify JWT token
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById((decoded as any).id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Check if user has required role
export const hasRole = (roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
};

// Verify college email domain
export const verifyCollegeEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  
  // Add your college domain validation logic here
  const validDomains = ['edu', 'ac.in']; // Example domains
  const domain = email.split('@')[1];
  
  if (!domain || !validDomains.some(d => domain.endsWith(d))) {
    return res.status(400).json({ message: 'Invalid college email domain' });
  }

  next();
};

// Rate limiting middleware (to be used with express-rate-limit)
export const createRateLimiter = (windowMs: number, max: number) => {
  const rateLimit = require('express-rate-limit');
  return rateLimit({
    windowMs,
    max,
    message: { message: 'Too many requests, please try again later' },
  });
}; 