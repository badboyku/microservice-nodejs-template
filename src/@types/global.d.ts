/** Services Types */
export type CheckHealthResult = { code: number; body: { status: string } };

/** Utils Types */
// config
export type Config = {
  app: { logLevel: string; logOutputFormat: string; nodeEnv: string; port: number };
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

declare global {}
