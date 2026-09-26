import app from './app.js';
import mongoose from 'mongoose';
import { connectDB } from './config/database.js';
import { redisConnection } from './config/redis.js';
import './workers/emailWorker.js'; 
import logger from './utils/logger.js';

const PORT = process.env.PORT || 5000;

// Connect to Database, then start server
let server: any;
connectDB().then(() => {
  server = app.listen(PORT, () => {
    logger.info(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}).catch((error) => {
  logger.error(`Failed to start server: ${error}`);
  process.exit(1);
});

// Graceful Shutdown
const shutdown = async (signal: string) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  if (server) {
    server.close(() => {
      logger.info('HTTP server closed.');
    });
  }
  await mongoose.connection.close(false);
  logger.info('MongoDB connection closed.');
  
  await redisConnection.quit();
  logger.info('Redis connection closed.');
  
  process.exit(0);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
