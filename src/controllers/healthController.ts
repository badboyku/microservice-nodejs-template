import { healthService } from '@services';
import logger from '@utils/logger';
import type { NextFunction, Request, Response } from 'express';

const checkHealth = (_req: Request, res: Response, next: NextFunction) => {
  logger.debug('healthController: checkHealth called');

  try {
    const { data, error } = healthService.checkHealth();

    res.status(error ? error.code : 200);
    res.json(error ? { ok: false, error: error.message } : { ok: true, data });
  } catch (err) {
    next(err);
  }
};

export default { checkHealth };
