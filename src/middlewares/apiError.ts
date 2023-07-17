import { UnauthorizedError } from '@errors';
import { config, logger } from '@utils';
import type { NextFunction, Request, Response } from 'express';

const handleError = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { name, message } = err;
  const isDev = config.app.nodeEnv === 'DEVELOPMENT';
  let code: number;
  let error: string;

  switch (name) {
    case 'Bad Request':
    case 'ValidationError':
      code = 400;
      error = message;
      break;
    case 'Unauthorized':
    case 'UnauthorizedError':
      code = 401;
      // Let's hide the unauthorized error message from production requests.
      error = isDev ? message : 'Unauthorized';
      break;
    case 'NotFoundError':
      code = 404;
      error = message;
      break;
    default:
      code = 500;
      // Let's hide the error name and message from production requests.
      error = isDev ? `${name}: ${message}` : 'Could not handle request, error has been logged internally';
  }

  res.status(code);
  res.json({ ok: false, error });
};

const logError = (err: Error, req: Request, _res: Response, next: NextFunction) => {
  const { headers, method, url, params, query, body } = req;
  const { name, message: errMsg, stack } = err;

  const message = 'Error handling API request';
  const context = { req: { headers, method, url, params, query, body }, err: { name, message: errMsg, stack } };
  logger.warn(message, context);

  next(err);
};

const notAuthorized = (_req: Request, _res: Response, next: NextFunction) => {
  next(new UnauthorizedError('Unauthorized'));
};

export default { handleError, logError, notAuthorized };
