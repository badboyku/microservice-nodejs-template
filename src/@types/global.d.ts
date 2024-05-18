import type { OpenApiRequestMetadata } from 'express-openapi-validator/dist/framework/types';

/** services types */
// health
export type CheckHealthResult = { data?: { status: string } };

/** utils types */
// config
export type Config = {
  app: { logLevel: string; logOutputFormat: string; name: string; nodeEnv: string; port: number; version: string };
  cors: { allowedHeaders: string; credentials: boolean; whitelist: string };
};

// logger
export type LogContext = Record<string, unknown>;
export type Logger = {
  debug: (message: string, context?: LogContext) => void;
  info: (message: string, context?: LogContext) => void;
  warn: (message: string, context?: LogContext) => void;
  error: (message: string, context?: LogContext) => void;
};

declare global {
  namespace Express {
    export interface Request {
      openapi?: OpenApiRequestMetadata;
      swaggerDoc?: { [k: string]: unknown };
    }
  }
}
