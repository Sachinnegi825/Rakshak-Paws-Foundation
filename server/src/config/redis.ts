import Redis from 'ioredis';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

const redisUrl = process.env.REDIS_URL as string;

export const redisConnection = new (Redis as any)(redisUrl, {
  maxRetriesPerRequest: null,
  retryStrategy(times: number) {
    logger.warn(`Retrying redis connection: attempt ${times}`);
    return Math.min(times * 50, 2000);
  }
});

redisConnection.on('connect', () => {
  logger.info('Redis Connected successfully');
});

redisConnection.on('error', (err: any) => {
  logger.error(`Redis Connection Error: ${err}`);
});
