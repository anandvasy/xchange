import { createServer } from 'http';
import { Server } from 'socket.io';
import { createClient } from 'redis';
import { EventType } from '@college-community/core';
import jwt from 'jsonwebtoken';

// Environment variables validation
const JWT_SECRET = process.env.JWT_SECRET;
const REDIS_URL = process.env.REDIS_URL;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET must be defined');
}

if (!REDIS_URL) {
  throw new Error('REDIS_URL must be defined');
}

// Create HTTP server
const httpServer = createServer();

// Create Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
  },
});

// Create Redis client
const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Connect to Redis
redisClient.connect().catch(console.error);

// Authentication middleware
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    socket.data.user = decoded;
    next();
  } catch (error) {
    next(new Error('Authentication error'));
  }
});

// Handle connections
io.on('connection', async (socket) => {
  const userId = socket.data.user.id;

  // Join user's personal room
  socket.join(`user:${userId}`);

  // Handle joining community rooms
  socket.on('join:community', (communityId: string) => {
    socket.join(`community:${communityId}`);
  });

  // Handle leaving community rooms
  socket.on('leave:community', (communityId: string) => {
    socket.leave(`community:${communityId}`);
  });

  // Handle post events
  socket.on('post:create', async (data) => {
    io.to(`community:${data.communityId}`).emit(EventType.POST_CREATED, data);
  });

  socket.on('post:update', async (data) => {
    io.to(`community:${data.communityId}`).emit(EventType.POST_UPDATED, data);
  });

  socket.on('post:delete', async (data) => {
    io.to(`community:${data.communityId}`).emit(EventType.POST_DELETED, data);
  });

  // Handle comment events
  socket.on('comment:create', async (data) => {
    io.to(`community:${data.communityId}`).emit(EventType.COMMENT_CREATED, data);
  });

  socket.on('comment:update', async (data) => {
    io.to(`community:${data.communityId}`).emit(EventType.COMMENT_UPDATED, data);
  });

  socket.on('comment:delete', async (data) => {
    io.to(`community:${data.communityId}`).emit(EventType.COMMENT_DELETED, data);
  });

  // Handle user presence
  await redisClient.hSet('presence', userId, 'online');
  io.emit(EventType.USER_ONLINE, { userId });

  socket.on('disconnect', async () => {
    await redisClient.hSet('presence', userId, new Date().toISOString());
    io.emit(EventType.USER_OFFLINE, { userId, lastSeen: new Date() });
  });
});

// Start server
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
}); 