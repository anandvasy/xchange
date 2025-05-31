import mongoose from 'mongoose';
import { UserRole } from '@college-community/core';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.STUDENT,
  },
  collegeId: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  refreshToken: {
    type: String,
    select: false,
  },
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Method to generate JWT payload
userSchema.methods.toJWTPayload = function() {
  return {
    id: this._id,
    email: this.email,
    role: this.role,
    collegeId: this.collegeId,
  };
};

export const User = mongoose.model('User', userSchema); 