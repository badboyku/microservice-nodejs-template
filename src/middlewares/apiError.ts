import { UnauthorizedError } from '@errors';
import { config, logger } from '@utils';
import type { NextFunction, Request, Response } from 'express';

const handleError = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { name, message } = err;

  let code = 500;
  let error = 'Could not handle request; error has been logged internally.';

  if (['UnauthorizedError'].includes(name)) {
    code = 401;
    error = 'unauthorized';
  }

  const body = config.app.nodeEnv === 'DEVELOPMENT' ? { error: { name, message } } : { error };

  res.status(code);
  res.json(body);
};

const logError = (err: Error, req: Request, _res: Response, next: NextFunction) => {
  const { headers, method, url, params, query } = req;
  const { name, message: errMsg, stack } = err;

  const message = 'Error handling API request';
  const context = {
    req: { headers, method, url, params, query },
    err: { name, message: errMsg, stack },
  };
  logger.warn(message, context);

  next(err);
};

const notAuthorized = (_req: Request, _res: Response, next: NextFunction) => {
  next(new UnauthorizedError('unauthorized'));
};

export default { handleError, logError, notAuthorized };
