import process from 'node:process';
import type { Config } from '@types';

const config: Config = {
  app: {
    logLevel: process.env.APP_LOG_LEVEL?.toUpperCase() || 'INFO',
    logOutputFormat: process.env.APP_LOG_OUTPUT_FORMAT?.toUpperCase() || 'ELK',
    name: process.env.npm_package_name?.toUpperCase() || '',
    nodeEnv: process.env.NODE_ENV?.toUpperCase() || '',
    port: Number(process.env.APP_PORT) || 3000,
    version: process.env.npm_package_version?.toUpperCase() || '',
  },
  cors: {
    allowedHeaders: process.env.CORS_ALLOWED_HEADERS || '',
    credentials: process.env.CORS_CREDENTIALS?.toLowerCase() === 'true' || false,
    whitelist: process.env.CORS_WHITELIST || '',
  },
};

export default config;
