import healthService from 'services/healthService';
import logger from 'utils/logger';
import type { NextFunction, Request, Response } from 'express';

const checkHealth = (_req: Request, res: Response, next: NextFunction) => {
  logger.debug('healthController: checkHealth called');

  try {
    const { data } = healthService.checkHealth();

    res.status(200);
    res.json({ ok: true, data });
  } catch (err) {
    next(err);
  }
};

export default { checkHealth };
