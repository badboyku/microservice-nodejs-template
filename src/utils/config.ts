import process from 'node:process';
import { LOG_FORMATS, LOG_LEVELS } from '@utils/constants';
import type { Config } from '@types';

const config: Config = {
  app: {
    logLevel: process.env.APP_LOG_LEVEL?.toUpperCase() || LOG_LEVELS.INFO,
    logOutputFormat: process.env.APP_LOG_OUTPUT_FORMAT?.toUpperCase() || LOG_FORMATS.ELK,
    nodeEnv: process.env.NODE_ENV?.toUpperCase() || '',
    port: Number(process.env.APP_PORT) || 3000,
  },
  cors: {
    allowedHeaders: process.env.CORS_ALLOWED_HEADERS || '',
    credentials: Boolean(process.env.CORS_CREDENTIALS) || false,
    whitelist: process.env.CORS_WHITELIST || '',
  },
};

export default config;
