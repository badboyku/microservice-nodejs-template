import {healthService} from '@services';
import {logger} from '@utils';
import type {NextFunction, Request, Response} from 'express';

const checkHealth = (_req: Request, res: Response, next: NextFunction) => {
  logger.debug('healthController: checkHealth called');

  try {
    const { code, body } = healthService.checkHealth();

    res.status(code);
    res.json(body);
  } catch (err) {
    next(err);
  }
};

export default { checkHealth };
