import {logger} from '@utils';
import type {CheckHealthResult} from '@types';

const checkHealth = (): CheckHealthResult => {
  logger.debug('healthService: checkHealth called');

  const code = 200;
  const body = { status: 'ok' };

  return { code, body };
};

export default { checkHealth };
