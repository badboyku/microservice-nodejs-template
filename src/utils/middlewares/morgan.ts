import correlator from 'express-correlation-id';
import morgan from 'morgan';
import { config } from '@utils';
import { LOG_FORMATS, LOG_LEVELS } from '@utils/constants';
import type { FormatFn, TokenIndexer } from 'morgan';
import type { Request, Response } from 'express';

export const logReqRes = (tokens: TokenIndexer, req: Request, res: Response) => {
  const severity = LOG_LEVELS.INFO;
  const message = 'API request received/response sent';
  const context = {
    req: {
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      ip: tokens['remote-addr'](req, res),
      referrer: tokens.referrer(req, res),
      userAgent: tokens['user-agent'](req, res),
    },
    res: {
      status: tokens.status(req, res),
      contentLength: `${tokens.res(req, res, 'content-length')} B`,
      time: `${tokens['response-time'](req, res)} ms`,
    },
    totalTime: `${tokens['total-time'](req, res)} ms`,
  };
  const log = { correlationId: correlator.getId(), severity, message, context };

  return config.app.logOutputFormat === LOG_FORMATS.DEV ? JSON.stringify(log, null, 4) : JSON.stringify(log);
};

export default morgan(logReqRes as FormatFn);
